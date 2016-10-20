'use strict';

const steps = require('../../');

Feature('Contact Consent Step');

Before((
  I,
  contactConsentPage
) => {
  I.visitPage(contactConsentPage, steps);
});

Scenario('The correct form elements are on the page', (
  I,
  contactConsentPage
) => {
  I.seeElements(contactConsentPage.id.consent);
});

Scenario('An error is shown if the form is submitted without selecting an option', (
  I,
  contactConsentPage
) => {
  I.submitForm();
  I.seeErrors(contactConsentPage.id.consent);
});

Scenario('If I select yes, I am taken to the contact details page', (
  I,
  contactConsentPage,
  contactDetailsPage
) => {
  I.checkOption(contactConsentPage.id.yes);
  I.submitForm();
  I.seeInCurrentUrl(contactDetailsPage.url);
});

Scenario('If I select no I am taken to the confirm page', (
  I,
  contactConsentPage,
  confirmPage
) => {
  I.checkOption(contactConsentPage.id.no);
  I.submitForm();
  I.seeInCurrentUrl(confirmPage.url);
});
