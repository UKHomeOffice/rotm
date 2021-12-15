'use strict';

const { expect } = require('chai');
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
    
  });

  describe("The 'get' method", () => {
    beforeEach(() => {
      // sinon.stub(Base.prototype, 'get');
      
    });
    it('Check \'get\' is called', () => {
      instance = new (Behaviour(Base));
      spy = sinon.spy()

      instance.on('complete', spy);
      instance.get(req, res, next);
    });
  });
});
