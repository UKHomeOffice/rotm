'use strict';

// TODO Why are test files not loading from setup.js
const Behaviour = require('../../../../../apps/rotm/behaviours/save-image');
const expect = require('chai').expect;
const chai = require('chai').use(require('sinon-chai'));
const reqres = require('hof').utils.reqres;
const sinon = require('sinon');

describe("apps/rotm 'save-image' behaviour should ", () => {
  it('export a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    constructor() {}
    process(){}
    configure() {}
    locals() {}
  }

  let req;
  let res;
  let instance;
  let next;
  let file;

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    next = 'foo'
  });

  describe('The save-image method', () => {
    before(() => {
      sinon.stub(Base.prototype, 'process').returns(req, res, next);
      instance = new (Behaviour(Base))();
      instance.process(req, res, next);
    });
    //TODO - Currently getting error
    // TypeError: Behaviour(...) is not a constructor

    it('always calls super.process', () => {
      expect(Base.prototype.process).to.have.been.called;
    });
  });
});
