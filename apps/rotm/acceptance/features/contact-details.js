'use strict';

const steps = require('../../');

Feature('Contact Details Step');

Before((
  I,
  contactDetailsPage
) => {
  I.visitPage(contactDetailsPage, steps);
});

Scenario('The correct fields are on the page', (
  I,
  contactDetailsPage
) => {
  I.seeElements([
    contactDetailsPage.id.name,
    contactDetailsPage.id.contactType
  ]);
});

Scenario('The correct fields are hidden on load', (
  I,
  contactDetailsPage
) => {
  I.dontSeeElements([
    contactDetailsPage.id.email,
    contactDetailsPage.id.phone,
    contactDetailsPage.id.phone2,
  ]);
});

Scenario('I see errors if I try and submit an incomplete form', (
  I,
  contactDetailsPage
) => {
  I.submitForm();
  I.seeErrors([
    contactDetailsPage.id.name,
    contactDetailsPage.id.contactType
  ]);
});

Scenario('I see an error if I submit the form without an email address', (
  I,
  contactDetailsPage
) => {
  contactDetailsPage.enterName();
  contactDetailsPage.checkEmail();
  I.checkOption(contactDetailsPage.id.emailOption);
  I.submitForm();
  I.seeErrors(contactDetailsPage.id.email);
});

Scenario('I see an error if I submit the form with an invalid email address', (
  I,
  contactDetailsPage
) => {
  contactDetailsPage.enterName();
  contactDetailsPage.checkEmail();
  I.fillField(contactDetailsPage.id.email, contactDetailsPage.content.invalidEmail);
  I.submitForm();
  I.seeErrors(contactDetailsPage.id.email);
});

Scenario('I see an error if I submit the form without a phone number (phone)', (
  I,
  contactDetailsPage
) => {
  contactDetailsPage.enterName();
  contactDetailsPage.checkPhone();
  I.submitForm();
  I.seeErrors(contactDetailsPage.id.phone);
});

Scenario('I see an error if I submit the form with an invalid phone number (phone)', (
  I,
  contactDetailsPage
) => {
  contactDetailsPage.enterName();
  contactDetailsPage.checkPhone();
  I.fillField(contactDetailsPage.id.phone, contactDetailsPage.content.invalidPhone);
  I.submitForm();
  I.seeErrors(contactDetailsPage.id.phone);
});

Scenario('I see an error if I submit the form without a phone number (text)', (
  I,
  contactDetailsPage
) => {
  contactDetailsPage.enterName();
  contactDetailsPage.checkText();
  I.checkOption(contactDetailsPage.id.textOption);
  I.submitForm();
  I.seeErrors(contactDetailsPage.id.phone2);
});

Scenario('I see an error if I submit the form with an invalid phone number (text)', (
  I,
  contactDetailsPage
) => {
  contactDetailsPage.enterName();
  contactDetailsPage.checkText();
  I.fillField(contactDetailsPage.id.phone2, contactDetailsPage.content.invalidPhone);
  I.submitForm();
  I.seeErrors(contactDetailsPage.id.phone2);
});

Scenario('I am taken to the confirm page on a valid submission', (
  I,
  contactDetailsPage,
  confirmPage
) => {
  contactDetailsPage.enterName();
  contactDetailsPage.checkEmail();
  I.fillField(contactDetailsPage.id.email, contactDetailsPage.content.validEmail);
  I.submitForm();
  I.seeInCurrentUrl(confirmPage.url);
});
