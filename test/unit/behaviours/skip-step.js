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

  describe('getValues() with no steps provided', () => {
    beforeEach(() => {
      res = reqres.res();
      req = reqres.req();
      SkipStep = Behaviour()(Base);
      instance = new SkipStep();
      sinon.stub(Base.prototype, 'getValues');
      sinon.spy(console, 'warn');
    });
    afterEach(() => {
      Base.prototype.getValues.restore();
      console.warn.restore();
    });

    it('sends a warning when no step is provided', (done) => {
      values = {
        steps: ['step1']
      };
      Base.prototype.getValues.yields(null, values);
      instance.getValues(req, res, (err) => {
        expect(err).not.to.exist;
        expect(console.warn).to.be.called;
        expect(console.warn.calledWith('Warning: no steps provided behaviour will not skip')).to.be.true;
        done();
      });
    });
  });

  describe('getValues() with steps provided', () => {
    beforeEach(() => {
      sessionModel = {
        set: sinon.stub()
      };
      res = reqres.res();
      req = reqres.req({sessionModel,
        path: {}
      });
      SkipStep = Behaviour({
        steps: ['step3']
      })(Base);
      instance = new SkipStep();
      sinon.stub(Base.prototype, 'getValues');
    });
    afterEach(() => {
      Base.prototype.getValues.restore();
    });

    it(`adds step3 called by the behaviour to the completed steps in the sessionModel if
       it is not already there`, (done) => {
      values = {
        steps: ['step1']
      };
      Base.prototype.getValues.yields(null, values);
      req.path = 'step2';
      instance.getValues(req, res, (err) => {
        expect(err).not.to.exist;
        expect(sessionModel.set).to.have.been.calledWith('steps', ['step1', 'step2', 'step3']);
        done();
      });
    });

    it('does not add step3 by the behaviour to completed steps in the sessionModel if it is already there', (done) => {
      values = {
        steps: ['step1', 'step3']
      };
      Base.prototype.getValues.yields(null, values);
      req.path = 'step2';
      instance.getValues(req, res, (err) => {
        expect(err).not.to.exist;
        expect(sessionModel.set).to.not.have.been.called;
        done();
      });
    });

    it('adds the current step to the completed step if it has not been defined in the behaviour', (done) => {
      values = {
        steps: ['step1']
      };
      Base.prototype.getValues.yields(null, values);
      req.path = 'step2';
      instance.getValues(req, res, (err) => {
        expect(err).not.to.exist;
        expect(sessionModel.set).to.have.been.calledWith('steps', ['step1', 'step2', 'step3']);
        done();
      });
    });

  });
});
