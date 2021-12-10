'use strict';

const assert = require('assert');
const Behaviour = require('../../../../../apps/rotm/behaviours/skip-step');

describe("apps/rotm 'skip-step' behaviour should ", () => {
  it('export a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    get() {}
  }

  let req;
  let res;
  let next;
  let spy;
  let instance;

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    instance = new (Behaviour(Base))();
    spy = sinon.spy(instance, 'get');
    instance.on('complete', spy);
  });

  describe("The 'get' method", () => {
    beforeEach(() => {
      // sinon.stub(Base.prototype, 'get');

      instance.get(req, res, next);
    });
    it('Check things', () => {
      instance.get(req, res, next);
      assert(spy.called);
    });
  });
});
