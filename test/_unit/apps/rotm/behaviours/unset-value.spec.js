'use strict';

// TODO Why are test files not loading from setup.js
const Behaviour = require('../../../../../apps/rotm/behaviours/unset-value');
const expect = require('chai').expect;
const chai = require('chai').use(require('sinon-chai'));
const reqres = require('hof').utils.reqres;
const sinon = require('sinon');

describe("apps/rotm 'unset-value' behaviour should ", () => {
  it('export a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    locals() {}
  }

  let req;
  let res;
  let instance;
  const next = 'foo';

  beforeEach(() => {
    req = reqres.req({ form: { errors: ['testError'] } });
    res = reqres.res();
  });

  describe('The locals method', () => {
    before(() => {
      sinon.stub(Base.prototype, 'locals').returns(res, res, next);
      instance = new (Behaviour(Base))();
      instance.locals(req, res);
    });
    it('always calls super.locals', () => {
      expect(Base.prototype.locals).to.have.been.called;
    });
    after(() => {
      Base.prototype.locals.restore();
    });
  });
});
