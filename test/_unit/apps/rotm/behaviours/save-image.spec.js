'use strict';

// TODO Why are test files not loading from setup.js
const Behaviour = require('../../../../../apps/rotm/behaviours/save-image');
const expect = require('chai').expect;
const chai = require('chai').use(require('sinon-chai'));
const reqres = require('hof').utils.reqres;
const sinon = require('sinon');

// TODO - Getting a 'TypeError: Behaviour(...) is not a constructor' error.


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
  const next = 'foo';

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
  });

  describe('The save-image method', () => {
    before(() => {
      // sinon.stub(Base.prototype, 'process').withArgs('file');
      // instance = new (Behaviour(Base))();
    });
    it('always calls super.configure', () => {
      // console.log(req);
    });
  });
});
