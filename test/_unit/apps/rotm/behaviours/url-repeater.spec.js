'use strict';

// TODO Why are test files not loading from setup.js
const Behaviour = require('../../../../../apps/rotm/behaviours/url-repeater');
const expect = require('chai').expect;
const chai = require('chai').use(require('sinon-chai'));
const reqres = require('hof').utils.reqres;
const sinon = require('sinon');

describe('apps/rotm \'url-repeater\' behaviour should ', () => {
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
      const next = 'foo';
  
      beforeEach(() => {
        req = reqres.req();
        res = reqres.res();
      });

      describe('The locals method', () => {
        before(() => {
            sinon.stub(Base.prototype, 'saveValues').returns(res, res, next);
            req.form.values
            instance = new (Behaviour(Base))();
            instance.locals(req, res, next);
        });
        it('always calls super.locals', () => {
            expect(Base.prototype.saveValues).to.have.been.called;
        });
        after(() => {
            Base.prototype.configure.restore();
        });
      })
});