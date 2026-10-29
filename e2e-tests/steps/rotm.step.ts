import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
export const { Given, When, Then } = createBdd(test);


// ************************************************************************************************************************************ */
//                                                              ROTM Step Definitions
// ************************************************************************************************************************************ */


Given('I visit the Rotm page', async ({ pages }) => {
  await pages.rotmHomePgHaveLinkToMaterialPage.openRotmHomePage();
});


When('I fill out the answers to Rotm form pertaining to {string}', async ({pages}, description: string) => {
  switch (description.toLowerCase()) {
    case 's1 - have (0 additional) link to the material - have evidence - another file-yes - email contact':
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES, 'no-preview.png');
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.EMAIL_LABEL);
      break;
    case 's3 - have (4 additional) links to the material-remove links and add again - have evidence - another file-yes- email & telephone contacts':
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.HAVE_LINK, 4);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES, 'no-preview.png');
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.BOTH_CONTACTS);
      break;
    case 's4 - have (3 additional) links to the material - have evidence - another file-yes - no contact':
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.HAVE_LINK, 3);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES, 'no-preview.png');
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.DO_NOT_GIVE_CONTACT);
      break;
    case 's8 - have (1 additional) link to the material - no evidence - another file-yes - email & telephone contacts':
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.HAVE_LINK, 1);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.NO_EVIDENCE);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.BOTH_CONTACTS);
      break;
    case "s9 - don't have link - have evidence - another file-yes - email contact":
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.DO_NOT_HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES, 'no-preview.png');
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.EMAIL_LABEL);
      break;
    case "s16 - don't have link - no evidence - yes contact - email & telephone contacts":
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.DO_NOT_HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.NO_EVIDENCE);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.BOTH_CONTACTS);
      break;
    case 's2 - have (0 additional) link to the material - have evidence - another file-yes- telephone contact':
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES, 'no-preview.png');
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.TELEPHONE_LABEL);
      break;
    case 's5 - have (2 additional) links to the material - have evidence - another file-no - no contact':
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.HAVE_LINK, 2);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_NO, 'no-preview.png');
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.DO_NOT_GIVE_CONTACT);
      break;
    case 's6 - have (1 additional) link to the material - no evidence - another file-yes - email contact':
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.HAVE_LINK, 1);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.NO_EVIDENCE);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.EMAIL_LABEL);
      break;
    case 's7 - have (1 additional) link to the material - no evidence - another file-yes - telephone contact':
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.HAVE_LINK, 1);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.NO_EVIDENCE);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.TELEPHONE_LABEL);
      break;
    case "s10 - don't have link - have evidence - another file-yes - telephone contact":
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.DO_NOT_HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES, 'no-preview.png');
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.TELEPHONE_LABEL);
      break;
    case "s11 - don't have link - have evidence - another file-yes - email & telephone contacts":
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.DO_NOT_HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES, 'no-preview.png');
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.BOTH_CONTACTS);
      break;
    case "s12 - don't have link - have evidence - another file-yes - no contact":
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.DO_NOT_HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES, 'no-preview.png');
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.DO_NOT_GIVE_CONTACT);
      break;
    case "s13 - don't have link - have evidence - another file-no - no contact":
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.DO_NOT_HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_NO, 'no-preview.png');
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.DO_NOT_GIVE_CONTACT);
      break;
    case "s14 - don't have link - no evidence - yes contact - email contact":
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.DO_NOT_HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.NO_EVIDENCE);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.EMAIL_LABEL);
      break;
    case "s15 - don't have link - no evidence - yes contact - telephone contact":
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.DO_NOT_HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.NO_EVIDENCE);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.TELEPHONE_LABEL);
      break;
    case "s17 - don't have link - no evidence - no contact":
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.DO_NOT_HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.NO_EVIDENCE);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.DO_NOT_GIVE_CONTACT);
      break;
    default:
      throw new Error(`Invalid scenario: ${description}`);
  }
});

When('I add {int} additional links to my report and continue', async ({ pages }, addLinks: number) => {
  await pages.rotmCheckYourReportPage.navigateBackToHomePage();
  await pages.rotmHomePgHaveLinkToMaterialPage.addAnotherLink(addLinks, c.LINK_TO_MATERIAL);
  await pages.basePage.clickContinueButton();
  await pages.rotmDoYouHaveEvidencePage.iSelectOptionAndSelectContinue(c.NO_EVIDENCE);
  await pages.rotmAnythingElseYouCanTellUsPage.enterAdditionalDetails(`Added ${addLinks} additional links to material`);
  await pages.rotmAreYouWillingToBeContactedPage.areYouWillingToBeContacted(c.DO_NOT_GIVE_CONTACT);
});

When('I select continue', async ({ pages }) => {
  await pages.basePage.clickContinueButton();
});

When('I select {string} link to material and click continue', async ({ pages }, option: string) => {
  await pages.rotmHomePgHaveLinkToMaterialPage.yesHaveLinkToMaterial(option, c.LINK_TO_MATERIAL);
  await pages.basePage.clickContinueButton();
});

When('I select {string} for evidence and click continue', async ({ pages }, evidence: string) => {
  await pages.rotmDoYouHaveEvidencePage.uploadFileAndContinue(evidence);
});

When('I select {string} for more evidence and click continue', async ({ pages }, additionalEvidence: string) => {
  await pages.rotmUploadAnotherFilePage.iSelectOptionAndSelectContinue(additionalEvidence);
});

When('I select {string} to give contact details and click continue', async ({ pages }, giveContact: string) => {
  await pages.rotmAreYouWillingToBeContactedPage.areYouWillingToBeContacted(giveContact);
});

When('I enter my contact details for ROTM and click continue', async ({ pages }) => {
  await pages.rotmWhatAreYourContactDetailsPage.enterYourFullName(c.FULL_NAME);
  await pages.rotmWhatAreYourContactDetailsPage.selectContact(c.TELEPHONE_LABEL, c.TELEPHONE);
  await pages.basePage.clickContinueButton();
});

When('I choose to submit the Rotm questionnaire', async ({ pages }) => {
  await pages.rotmCheckYourReportPage.completeSendYourReport();
});


Then('I am navigated to {string} page', async ({ pages }, expectedPageHeaderText: string) => {
  const actualPageHeaderTextLocator = pages.rotmCheckYourReportPage.headerText;
  await expect(actualPageHeaderTextLocator).toHaveText(expectedPageHeaderText);
});

Then('I see {string} error message displayed for ROTM', async ({ pages }, expectedErrorMessage: string) => {
  expect(await pages.basePage.getErrorMessageDetailText()).toEqual(expectedErrorMessage);
});

Then('I see error message displayed for ROTM', async ({ pages }, expectedErrorMessage: string) => {
  expect(await pages.basePage.getErrorMessageDetailText()).toEqual(expectedErrorMessage.trim());
});

Then('I see {string} error header message displayed for ROTM', async ({ pages }, expectedErrorMessage: string) => {
  expect(await pages.basePage.getThereIsAProblemTextErrorText()).toEqual(expectedErrorMessage);
});

Then('I check the change is updated to {int} links on the \'Check your report\' page and continue', async ({ pages }, links: number) => {
  expect(await pages.rotmCheckYourReportPage.getAdditionalLinks()).toEqual(links);
});

Then('I see the Rotm header link service name {string}', async ({ pages }, rotmHeaderLinkName: string) => {
  expect((await pages.rotmHomePgHaveLinkToMaterialPage.getRotmHeaderLink()).trim()).toEqual(rotmHeaderLinkName);
});
