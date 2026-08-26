'use strict';

const proxyquire = require('proxyquire').noCallThru().noPreserveCache();
const reCaptcha = require('../../../../apps/rotm/behaviours/recaptcha');
const caseworkerEmailer = sinon.stub();
const referralEmailer = sinon.stub();
const caseworkerEmailFactory = sinon.stub()
  .onFirstCall().returns(caseworkerEmailer)
  .onSecondCall().returns(referralEmailer);

const app = proxyquire('../../../../apps/rotm', {
  './behaviours/caseworker-email': caseworkerEmailFactory
});

describe('apps/rotm config', () => {
  it('should not export reCaptcha as a global wizard behaviour', () => {
    expect(app.behaviours).to.equal(undefined);
  });

  it('should apply reCaptcha only to the intended steps', () => {
    const intendedSteps = ['/can-we-contact', '/check-your-report'];

    intendedSteps.forEach(step => {
      expect(app.steps[step].behaviours).to.include(reCaptcha);
    });

    const otherSteps = Object.keys(app.steps).filter(
      step => !intendedSteps.includes(step)
    );

    otherSteps.forEach(step => {
      expect(app.steps[step].behaviours || []).to.not.include(reCaptcha);
    });
  });

  it('should apply both email behaviours to the confirmation step', () => {
    expect(app.steps['/check-your-report'].behaviours).to.include(caseworkerEmailer);
    expect(app.steps['/check-your-report'].behaviours).to.include(referralEmailer);
  });
});
