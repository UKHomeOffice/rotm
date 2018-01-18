'use strict';

Feature('Delete image');

Scenario('I can delete an image after I have uploaded one', (
  I
) => {
  I.amOnPage('/');
  I.completeToStep('/image');
  I.attachFile('input[name="image"]', './apps/rotm/acceptance/screenshot.png');
  I.seeInCurrentUrl('/add-image');
  I.checkOption('#add-image-no');
  I.click('input[type="submit"]');
  I.seeInCurrentUrl('/image');
  I.click('a[href="/check-your-report"]');
  I.see('Not given', 'td[data-field="image"]');
});
