'use strict';

const proxyquire = require('proxyquire');
const { config } = require('chai');
const chai = require('chai')
const should = chai.should();
const expect = chai.expect;
const sinon = require('sinon');

const configStub = {}
let hofStub = {
  components: {
    emailer: sinon.stub()
  }
}
const emailer = proxyquire('../../../../../apps/rotm/behaviours/caseworker-email', {
  '../../../config': configStub,
  'hof': hofStub 
});
// const emailer = require('../../../../apps/rotm/behaviours/caseworker-email');

// somewhere in the settings which is being pulled from config is the email values

describe.only('apps/rotm/behaviours/caseworker-email', () => {
  it('exports a function', () => {
    expect(emailer).to.be.a('function');
  });

  describe('Emailer', () => {
    it('returns an extended object', () => {
      const settings = {
        transport: 'stub',
        caseworker: 'mohamed@lycos.com'
      }
      const result = emailer(settings);
      console.log('result ========> ', JSON.stringify(result, undefined, 4));
      console.log('hofStub ========>', JSON.stringify(hofStub, undefined, 4));
      console.log('========>', result);
    })
  })
})