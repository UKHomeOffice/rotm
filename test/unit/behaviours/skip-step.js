'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../apps/rotm/behaviours/skip-step');

describe('apps/behaviours/skip-step', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
      getValues() {}
  }
  let req;
  let res;
  let sessionModel;
  let instance;
  let SkipStep;

  beforeEach(() => {
    sessionModel = {
      get: sinon.stub(),
      set: sinon.stub(),
      unset: sinon.stub()
    };
    res = reqres.res();
    req = reqres.req({sessionModel,
      form: {
        options: {
          route: {}
        }
      }});
    SkipStep = Behaviour(Base);
    instance = new SkipStep();
  });

  describe('getValues()', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'getValues');
    });
    afterEach(() => {
      Base.prototype.getValues.restore();
    });

    it('adds the next step to completed steps in the sessionModel if it is not there', () => {
      req.sessionModel.get.withArgs('steps').returns(['step1']);
      req.form.options.route = 'step2';
      instance.getValues(req, res);
      expect(sessionModel.set).to.have.been.calledWith('steps', ['step1', 'step2']);
    });

    it('does not add a step to completed steps in the sessionModel if it is already there', () => {
      req.sessionModel.get.withArgs('steps').returns(['step1', 'step2']);
      req.form.options.route = 'step2';
      instance.getValues(req, res);
      expect(sessionModel.set).to.not.have.been.called;
    });
  });
});
