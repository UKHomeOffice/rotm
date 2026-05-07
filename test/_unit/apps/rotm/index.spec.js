'use strict';

const app = require('../../../../apps/rotm');
const reCaptcha = require('../../../../apps/rotm/behaviours/recaptcha');

describe('apps/rotm config', () => {
  it('should not export reCaptcha as a global wizard behaviour', () => {
    expect(app.behaviours).to.equal(undefined);
  });

  it('should apply reCaptcha only to the intended steps', () => {
    const intendedSteps = ['/can-we-contact'];

    intendedSteps.forEach(step => {
      expect(app.steps[step].behaviours).to.deep.equal([reCaptcha]);
    });

    const otherSteps = Object.keys(app.steps).filter(
      step => !intendedSteps.includes(step)
    );

    otherSteps.forEach(step => {
      expect(app.steps[step].behaviours || []).to.not.include(reCaptcha);
    });
  });
});
