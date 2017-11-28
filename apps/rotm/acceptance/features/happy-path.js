'use strict';

Feature('Happy Path');

Scenario('I can complete an application', (
  I
) => {
  I.amOnPage('/');
  I.completeToStep('/image');
  I.click('a[href="/check-your-report"]');
  I.submitForm();
  I.seeInCurrentUrl('/confirmation');
});
