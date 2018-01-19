'use strict';

const defaults = require('../defaults');

Feature('Given I am on /image');

// bugfix- previously the backLink did not appear
Scenario(`And I click the 'Continue without adding an image', Then I see
  a back button linking me to the previous step`, (
  I
) => {
  I.amOnPage('/');
  I.completeToStep('/image', defaults({
    source: 'Facebook',
    'more-info': ''
  }));
  I.click('a[href="/check-your-report"]');
  I.seeInCurrentUrl('/check-your-report');
  // a back button with a link to the image page
  I.seeElement('a[href="image"]');
});
