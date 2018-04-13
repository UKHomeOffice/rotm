'use strict';
const assert = require('assert');

Feature('Accessibility: Image thumbnail');

Scenario('There is alt text for an image I uploaded on the check-your-report step', function *(
  I
) {
  I.amOnPage('/');
  I.completeToStep('/image');
  I.attachFile('input[name="image"]', './apps/rotm/acceptance/screenshot.png');
  I.seeInCurrentUrl('/add-image');
  I.checkOption('#add-image-yes');
  I.click('input[type="submit"]');
  I.seeInCurrentUrl('/check-your-report');
  const attributesList = yield I.grabAttributeFrom('img', 'alt');
  const hasAlt = attributesList.includes('screenshot.png');
  assert.equal(true, hasAlt);
});
