'use strict';

const { expect } = require('chai');
const proxyquire = require('proxyquire').noCallThru().noPreserveCache();

describe("apps/rotm 'recaptcha' behaviour should", () => {
  class Base {}

  let req;
  let res;
  let next;
  let session;
  let createAssessmentStub;
  let projectPathStub;

  const confirmStep = '/check-your-report';

  const buildBehaviour = (threshold = 0.5) => {
    createAssessmentStub = sinon.stub();
    projectPathStub = sinon.stub().returns('projects/test-project');

    return proxyquire('../../../../../apps/rotm/behaviours/recaptcha', {
      '../../../config': {
        reCaptcha: {
          projectID: 'test-project',
          siteKeyScore: 'score-key',
          siteKeyCheckbox: 'checkbox-key',
          threshold
        }
      },
      '@google-cloud/recaptcha-enterprise': {
        RecaptchaEnterpriseServiceClient: function MockRecaptchaClient() {
          return {
            projectPath: projectPathStub,
            createAssessment: createAssessmentStub
          };
        }
      }
    });
  };

  const validScoreResponse = (score, action) => ([{
    tokenProperties: {
      valid: true,
      action
    },
    riskAnalysis: {
      score,
      reasons: []
    }
  }]);

  const setupRequest = route => {
    req = reqres.req();
    res = reqres.res();
    next = sinon.spy();

    session = {};
    req.form.options = { route, confirmStep };
    req.body = {};
    req.log = sinon.spy();
    res.redirect = sinon.spy();

    req.sessionModel.get = sinon.stub().callsFake(key => session[key]);
    req.sessionModel.set = sinon.spy((key, value) => {
      session[key] = value;
    });
    req.sessionModel.unset = sinon.spy(key => {
      delete session[key];
    });
  };

  it('exports a function', () => {
    const Behaviour = buildBehaviour();
    expect(Behaviour).to.be.a('function');
  });

  it('assesses SCORE token on non-confirm step and continues when score passes threshold', async () => {
    const Behaviour = buildBehaviour();
    setupRequest('/can-we-contact');

    req.body['g-recaptcha-token'] = 'score-token';
    createAssessmentStub.resolves(validScoreResponse(0.9, 'submit'));

    const instance = new (Behaviour(Base))();
    await instance.validate(req, res, next);

    expect(createAssessmentStub).to.have.been.calledOnce;
    expect(req.sessionModel.set).to.have.been.calledWith('reCAPTCHAScore', 0.9);
    expect(req.sessionModel.unset).to.have.been.calledWith('reCaptchaRenderCheckbox');
    expect(res.redirect).to.not.have.been.called;
    expect(next).to.have.been.calledOnce;
  });

  it('sets checkbox render flag on non-confirm step when SCORE is below threshold', async () => {
    const Behaviour = buildBehaviour();
    setupRequest('/can-we-contact');

    req.body['g-recaptcha-token'] = 'score-token';
    createAssessmentStub.resolves(validScoreResponse(0.2, 'submit'));

    const instance = new (Behaviour(Base))();
    await instance.validate(req, res, next);

    expect(req.sessionModel.set).to.have.been.calledWith('reCaptchaRenderCheckbox', true);
    expect(res.redirect).to.not.have.been.called;
    expect(next).to.have.been.calledOnce;
  });

  it('sets checkbox render flag on non-confirm step when SCORE token is missing', async () => {
    const Behaviour = buildBehaviour();
    setupRequest('/can-we-contact');

    const instance = new (Behaviour(Base))();
    await instance.validate(req, res, next);

    expect(createAssessmentStub).to.not.have.been.called;
    expect(req.sessionModel.set).to.have.been.calledWith('reCaptchaRenderCheckbox', true);
    expect(res.redirect).to.not.have.been.called;
    expect(next).to.have.been.calledOnce;
  });

  it('sets checkbox render flag on non-confirm step when assessment returns null score', async () => {
    const Behaviour = buildBehaviour();
    setupRequest('/can-we-contact');

    req.body['g-recaptcha-token'] = 'score-token';
    createAssessmentStub.resolves([{
      tokenProperties: {
        valid: false,
        invalidReason: 'MALFORMED'
      }
    }]);

    const instance = new (Behaviour(Base))();
    await instance.validate(req, res, next);

    expect(req.sessionModel.set).to.have.been.calledWith('reCaptchaRenderCheckbox', true);
    expect(res.redirect).to.not.have.been.called;
    expect(next).to.have.been.calledOnce;
  });

  it('skips checkbox assessment on confirm step when checkbox is not required', async () => {
    const Behaviour = buildBehaviour();
    setupRequest(confirmStep);

    const instance = new (Behaviour(Base))();
    await instance.validate(req, res, next);

    expect(createAssessmentStub).to.not.have.been.called;
    expect(res.redirect).to.not.have.been.called;
    expect(next).to.have.been.calledOnce;
  });

  it('redirects and stops middleware chain on confirm step when checkbox token is missing', async () => {
    const Behaviour = buildBehaviour();
    setupRequest(confirmStep);

    session.reCaptchaRenderCheckbox = true;

    const instance = new (Behaviour(Base))();
    await instance.validate(req, res, next);

    expect(res.redirect).to.have.been.calledOnceWith(confirmStep);
    expect(next).to.not.have.been.called;
  });

  it('assesses CHECKBOX token on confirm step and continues when score passes threshold', async () => {
    const Behaviour = buildBehaviour();
    setupRequest(confirmStep);

    session.reCaptchaRenderCheckbox = true;
    req.body['g-recaptcha-token-checkbox'] = 'checkbox-token';
    createAssessmentStub.resolves(validScoreResponse(0.95, 'send_report'));

    const instance = new (Behaviour(Base))();
    await instance.validate(req, res, next);

    expect(createAssessmentStub).to.have.been.calledOnce;
    expect(req.sessionModel.unset).to.have.been.calledWith('reCaptchaRenderCheckbox');
    expect(res.redirect).to.not.have.been.called;
    expect(next).to.have.been.calledOnce;
  });
});
