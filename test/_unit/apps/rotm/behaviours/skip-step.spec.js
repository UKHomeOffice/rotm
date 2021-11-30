'use strict';

// TODO Why are test files not loading from setup.js
const Behaviour = require('../../../../../apps/rotm/behaviours/skip-step');
const expect = require('chai').expect;
const chai = require('chai').use(require('sinon-chai'));
const reqres = require('hof').utils.reqres;
const sinon = require('sinon');
const device = require('device');

describe('apps/rotm \'skip-step\' behaviour should ', () => {
    it('export a function', () => {
      expect(Behaviour).to.be.a('function');
    });
    
});