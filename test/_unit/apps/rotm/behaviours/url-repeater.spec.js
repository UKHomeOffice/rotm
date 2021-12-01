'use strict';

// TODO Why are test files not loading from setup.js
const Behaviour = require('../../../../../apps/rotm/behaviours/url-repeater');
const expect = require('chai').expect;
const chai = require('chai').use(require('sinon-chai'));
const reqres = require('hof').utils.reqres;
const sinon = require('sinon');

describe("apps/rotm 'url-repeater' behaviour should ", () => {
  it('export a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    constructor() {}
    saveValues() {}
    getValues() {}
  }

  let req;
  let res;
  let instance;
  let next;

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    next = 'foo';
  });

  describe('The saveValues method', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'saveValues').returns(res, res, next);
      instance = new (Behaviour(Base))();
      req.form.values.urls = [
        req.form.values.url,
        (req.form.values['another-url-1'] = 'www.test1.com'),
        (req.form.values['another-url-2'] = 'www.test2.com'),
        (req.form.values['another-url-3'] = ''),
        (req.form.values['another-url-4'] = '')
      ];
      instance.saveValues(req, res, next);
    });
    it('always calls saveValues', () => {
      expect(Base.prototype.saveValues).to.have.been.called;
    });
    it('eliminates empty urls from the form', () => {
      expect(req.form.values.urls)
        .to.be.an('array')
        .that.does.not.include('');
      expect(req.form.values.urls).to.have.lengthOf(2);
    });
    afterEach(() => {
      Base.prototype.saveValues.restore();
    });
  });

  describe('The getValues method', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'getValues').returns(res, res, next);
      instance = new (Behaviour(Base))();
      instance.getValues(req, res, next);
    });
    it('always calls getValues', () => {
      expect(Base.prototype.getValues).to.have.been.called;
    });
    //TODO next not being called?
    it('calls the next function', () => {
      expect(next.calledOnce).to.be.true;
    });
    afterEach(() => {
      Base.prototype.getValues.restore();
    });
  });
});
