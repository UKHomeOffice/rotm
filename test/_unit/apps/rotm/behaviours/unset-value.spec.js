'use strict';

const { expect } = require('chai');
// TODO Why are test files not loading from setup.js
const Behaviour = require('../../../../../apps/rotm/behaviours/unset-value');

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
  let next;

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
  });

  describe('The \'locals\' method', () => {
    before(() => {
      sinon.stub(Base.prototype, 'locals').returns(req, res, next);
      // next = sinon.spy();
      instance = new (Behaviour('image')(Base));
    });
    it('should be called', () => {
      req.form.errors = {};
      instance.locals(req, res, next);
      expect(Base.prototype.locals).to.have.been.called;
    });
    it('should check form values equal null if there are no form errors and form values do not equal \'no\' ', () => {
      req.form.errors = {};
      req.form.values.image = 'yes';
      instance.locals(req, res, next);
      expect(req.form.values.image).to.eql(null);
    });
    it('should check form values do not equal null if errors and there are no form values', () => {
      req.form.errors = {error: 'error'};
      req.form.values.image = 'no';
      instance.locals(req, res, next);
      expect(req.form.values.image).to.not.eql(null);
    });
    after(() => {
      Base.prototype.locals.restore();
    });
  });
});
