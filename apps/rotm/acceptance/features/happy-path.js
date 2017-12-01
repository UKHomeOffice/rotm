'use strict';

const path = require('path');

Feature('Happy Path');

Scenario('I can complete an application', (
  I
) => {
  I.amOnPage('/');
  I.completeToStep('/confirmation', {
    image: path.resolve(__dirname, '../screenshot.png')
  });
});
