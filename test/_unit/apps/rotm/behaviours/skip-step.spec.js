'use strict';

const { expect } = require('chai');
const Behaviour = require('../../../../../apps/rotm/behaviours/skip-step');
const { EventEmitter } = require('events');
const { after } = require('lodash');


describe.only("apps/rotm 'skip-step' behaviour should ", () => {
  it('export a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    get() {}
  }

  let req;
  let res;
  let next;
  let emitter;
  let instance;
  let sandbox = sinon.createSandbox();

  before(() => {
    req = reqres.req();
    res = reqres.res();
    instance = new (Behaviour(Base))();
    emitter = new EventEmitter();
    sandbox.stub(instance, 'get').returns(emitter);
  });

  describe("The \'get\' method", () => {
    it("is called", () => {
      instance.get(req, res, next);
      
    });
  });
});
