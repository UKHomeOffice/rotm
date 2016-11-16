'use strict';

const steps = require('../../');

Feature('Confirm Step');

Before((
  I,
  confirmPage
) => {
  I.visitPage(confirmPage, steps);
});

Scenario('I see the correct table values', function *(
  I,
  confirmPage
) {
  yield I.setSessionData(steps.name, confirmPage.data);
  yield I.refreshPage();
  I.seeElements(Object.keys(confirmPage.confirmData).map(key => `[data-value='${confirmPage.confirmData[key]}']`));
});

Scenario('I am taken to the confirmation page on submit', function *(
  I,
  confirmPage,
  confirmationPage
) {
  yield I.setSessionData(steps.name, confirmPage.data);
  yield I.refreshPage();
  I.submitForm();
  I.seeInCurrentUrl(confirmationPage.url);
});
