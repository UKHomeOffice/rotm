'use strict';

const defaults = require('../defaults');

Feature('Happy Path');

Scenario('I can complete an application', (
  I
) => {
  I.amOnPage('/');
  I.completeToStep('/confirmation', defaults());
});
