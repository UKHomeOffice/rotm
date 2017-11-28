'use strict';

const reqres = require('reqres');
const Behaviour = require('../../../apps/rotm/behaviours/skip-step');

describe('apps/behaviours/skip-step', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
      get() {}
      emit() {}
  }
  let req;
  let res;
  let instance;
  let SkipStep;

  describe('get()', () => {
    beforeEach(() => {
      res = reqres.res();
      req = reqres.req();
      SkipStep = Behaviour(Base);
      instance = new SkipStep();
      sinon.stub(Base.prototype, 'get');
      sinon.stub(Base.prototype, 'emit');
    });
    afterEach(() => {
      Base.prototype.get.restore();
      Base.prototype.emit.restore();
    });

    it('emits a complete event when get is called', () => {
      instance.get(req, res);
      expect(Base.prototype.emit).to.have.been.calledWith('complete', req, res);
    });
  });
});
