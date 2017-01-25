'use strict';

const steps = require('../../');

Feature('Report step');

Before((
  I,
  reportPage
) => {
  I.visitPage(reportPage, steps);
});

Scenario('The correct fields elements are on the page', (
  I,
  reportPage
) => {
  I.seeElements([
    reportPage.id.where,
    reportPage.id.url,
    reportPage.id.description,
  ]);
});

Scenario('An error is shown if the where field is not completed', (
  I,
  reportPage
) => {
  I.submitForm();
  I.seeErrors(reportPage.id.where);
});

Scenario('An error is shown if an invalid URL is entered', (
  I,
  reportPage
) => {
  I.fillField(reportPage.id.where, reportPage.content.where);
  I.fillField(reportPage.id.url, reportPage.content.invalidUrl);
  I.submitForm();
  I.seeErrors(reportPage.id.url);
});

Scenario('On valid submission I am taken to the content-consent step', (
  I,
  reportPage,
  contactConsentPage
) => {
  I.fillField(reportPage.id.where, reportPage.content.where);
  I.submitForm();
  I.seeInCurrentUrl(contactConsentPage.url);
});
