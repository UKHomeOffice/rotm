'use strict';

const defaults = require('../defaults');

Feature('Confirmation');

Before((
  I
) => {
  I.amOnPage('/');
  I.completeToStep('/confirmation', defaults());
});

Scenario('User cannot return to previous steps after submitting the form', (
  I
) => {
  I.amOnPage('/check-your-report');
  I.dontSeeInCurrentUrl('/check-your-report');
  I.seeInCurrentUrl('/source');
  I.seeInField('source', '');
});
