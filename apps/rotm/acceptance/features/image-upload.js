'use strict';

Feature('Image Upload');

Scenario('I can upload an image', (
  I
) => {
  I.amOnPage('/');
  I.completeToStep('/image');
  I.attachFile('input[name="image"]', './apps/rotm/acceptance/screenshot.png');
  I.seeInCurrentUrl('/add-image');
});
