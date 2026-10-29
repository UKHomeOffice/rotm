import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
export const { Given, When, Then } = createBdd(test);


// ************************************************************************************************************************************ */
//                                                              ROTM Step Definitions
// ************************************************************************************************************************************ */

Given('I selected the data for scenario {string}', async ({ scenario }, description: string) => {
  scenario.description = description;
});

When('I fill out my answers for the Rotm questionnaire', async ({ pages, scenario }) => {
  const description = scenario.description;
  if (!description) {
    throw new Error('No ROTM scenario description selected');
  }

  switch (description.toLowerCase()) {
    case 's1 - have (0 additional) link to the material - have evidence - another file-yes - email contact':
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.TENANTS_EMAIL);
      break;
    case 's3 - have (4 additional) links to the material-remove links and add again - have evidence - another file-yes- email & telephone contacts':
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.HAVE_LINK, 4);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.BOTH_CONTACTS);
      break;
    case 's4 - have (3 additional) links to the material - have evidence - another file-yes - no contact':
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.HAVE_LINK, 3);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES);
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
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.TENANTS_EMAIL);
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
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.TELEPHONE_LABEL);
      break;
    case 's5 - have (2 additional) links to the material - have evidence - another file-no - no contact':
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.HAVE_LINK, 2);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_NO);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.DO_NOT_GIVE_CONTACT);
      break;
    case 's6 - have (1 additional) link to the material - no evidence - another file-yes - email contact':
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.HAVE_LINK, 1);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.NO_EVIDENCE);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.TENANTS_EMAIL);
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
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.TELEPHONE_LABEL);
      break;
    case "s11 - don't have link - have evidence - another file-yes - email & telephone contacts":
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.DO_NOT_HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.BOTH_CONTACTS);
      break;
    case "s12 - don't have link - have evidence - another file-yes - no contact":
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.DO_NOT_HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_YES);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.DO_NOT_GIVE_CONTACT);
      break;
    case "s13 - don't have link - have evidence - another file-no - no contact":
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.DO_NOT_HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.HAVE_EVIDENCE);
      await pages.rotmUploadAnotherFilePage.completeUploadPage(c.RESPONSE_NO);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.DO_NOT_GIVE_CONTACT);
      break;
    case "s14 - don't have link - no evidence - yes contact - email contact":
      await pages.rotmHomePgHaveLinkToMaterialPage.completeLinkPage(c.DO_NOT_HAVE_LINK, 0);
      await pages.rotmDoYouHaveEvidencePage.completeEvidencePage(c.NO_EVIDENCE);
      await pages.rotmAnythingElseYouCanTellUsPage.completeAdditionalDetailsPage(c.ADDITIONAL_DETAILS);
      await pages.rotmAreYouWillingToBeContactedPage.completeContactConsentPage(c.GIVE_CONTACT);
      await pages.rotmWhatAreYourContactDetailsPage.completeContactDetailsPage(c.TENANTS_EMAIL);
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

When('I visit the Rotm page', async ({ pages }) => {
  await pages.rotmHomePgHaveLinkToMaterialPage.openRotmHomePage();
});

When('I add {int} additional links to my report and continue', async ({ pages }, addLinks: number) => {
  await pages.rotmCheckYourReportPage.navigateBackToHomePage();
  await pages.rotmHomePgHaveLinkToMaterialPage.addAnotherLink(addLinks, c.LINK_TO_MATERIAL);
  await pages.basePage.clickContinueButton();
  await pages.rotmDoYouHaveEvidencePage.answerNoDontHaveLink(c.NO_EVIDENCE);
  await pages.rotmAnythingElseYouCanTellUsPage.answerEnterAdditionalDetails(`Added ${addLinks} additional links to material`);
  await pages.rotmAreYouWillingToBeContactedPage.answerAreYouWillingToBeContacted(c.DO_NOT_GIVE_CONTACT);
});

When('I select continue', async ({ pages }) => {
  await pages.basePage.clickContinueButton();
});

When('I select {string} link to material and click continue', async ({ pages }, option: string) => {
  await pages.rotmHomePgHaveLinkToMaterialPage.answerYesHaveLinkToMaterial(option, c.LINK_TO_MATERIAL);
  await pages.basePage.clickContinueButton();
});

When('I select {string} for evidence and click continue', async ({ pages }, evidence: string) => {
  await pages.rotmDoYouHaveEvidencePage.answerYesHaveEvidence(evidence);
});

When('I select {string} for more evidence and click continue', async ({ pages }, additionalEvidence: string) => {
  await pages.rotmUploadAnotherFilePage.answerUploadAnotherFileNo(additionalEvidence);
});

When('I select {string} to give contact details and click continue', async ({ pages }, giveContact: string) => {
  await pages.rotmAreYouWillingToBeContactedPage.answerAreYouWillingToBeContacted(giveContact);
});

When('I enter my contact details for ROTM and click continue', async ({ pages }) => {
  await pages.rotmWhatAreYourContactDetailsPage.answerYourFullName(c.FULL_NAME);
  await pages.rotmWhatAreYourContactDetailsPage.answerSelectContact(c.TELEPHONE_LABEL, c.TELEPHONE);
  await pages.basePage.clickContinueButton();
});

When('I am on the \'Check your report\' page', async ({ pages }) => {
  await pages.rotmCheckYourReportPage.assertReportPage();
});




Then('I check my report for Rotm', async ({ pages }) => {
  await pages.rotmCheckYourReportPage.assertReportPage();
});

Then('I am able to submit the Rotm questionnaire', async ({ pages }) => {
  await pages.rotmCheckYourReportPage.ansSendReport();
  await expect(await pages.rotmCheckYourReportPage.getReportSentText()).toEqual('Report sent');
});

Then('I am able to navigate back to ROTM home page', async ({ pages }) => {
  await pages.rotmCheckYourReportPage.navigateBackToHomePage();
  await pages.rotmHomePgHaveLinkToMaterialPage.assertHomePage();
});

Then('I see {string} error message displayed for ROTM', async ({ pages }, expectedErrorMessage: string) => {
  await expect(await pages.basePage.getErrorMessageDetailText()).toEqual(expectedErrorMessage);
});

Then('I see error message displayed for ROTM', async ({ pages }, expectedErrorMessage: string) => {
  await expect(await pages.basePage.getErrorMessageDetailText()).toEqual(expectedErrorMessage.trim());
});

Then('I see {string} error header message displayed for ROTM', async ({ pages }, expectedErrorMessage: string) => {
  await expect(await pages.basePage.getThereIsAProblemTextErrorText()).toEqual(expectedErrorMessage);
});

Then('I check the change is updated to {int} links on the \'Check your report\' page and continue', async ({ pages }, links: number) => {
  await expect(await pages.rotmCheckYourReportPage.getAdditionalLinks()).toEqual(links);
});

Then('I see the Rotm header link service name {string}', async ({ pages }, rotmHeaderLinkName: string) => {
  await expect((await pages.rotmHomePgHaveLinkToMaterialPage.getRotmHeaderLink()).trim()).toEqual(rotmHeaderLinkName);
});
