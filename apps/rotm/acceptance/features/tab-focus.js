'use strict';
const assert = require('assert');

Feature('Accessibility Tab focus');

Scenario('Given I am on image I can not tab into a hidden element',
  function *(I) {
  I.amOnPage('/');
  I.completeToStep('/image');
  // previously if you tabbed into the elements 6 times then the hidden element would get focused on
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.pressKey('Tab');
  I.pressKey('Tab');
  const hiddenFocus = yield I.hasFocus('#file-upload');
  assert.equal(false, hiddenFocus);
});
