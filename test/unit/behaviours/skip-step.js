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
  let values;

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

    it('adds the next step to completed steps in the sessionModel if it is not there', (done) => {
      values = {
        steps: ['step1']
      };
      Base.prototype.getValues.yields(null, values);
      req.form.options.route = 'step2';
      instance.getValues(req, res, (err) => {
        expect(err).not.to.exist;
        expect(sessionModel.set).to.have.been.calledWith('steps', ['step1', 'step2']);
        done();
      });
    });

    it('does not add a step to completed steps in the sessionModel if it is already there', (done) => {
      values = {
        steps: ['step1', 'step2']
      };
      Base.prototype.getValues.yields(null, values);
      req.form.options.route = 'step2';
      instance.getValues(req, res, (err) => {
        expect(err).not.to.exist;
        expect(sessionModel.set).to.not.have.been.called;
        done();
      });
    });
  });
});
