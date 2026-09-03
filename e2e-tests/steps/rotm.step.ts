import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test, Pages } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { getRotmApplicantForScenario, RotmApplicant } from '../test-data/rotm-applicant';

export const { Given, When, Then } = createBdd(test);

let selectedApplicant: RotmApplicant;

export class BficStepLib {
  constructor(private readonly pages: Pages) {}

  async openRotmHomePage() {
    await this.pages.rotmHomePgHaveLinkToMaterialPage.openRotmHomePage();
  }

  async getRotmHeaderLinkServiceName(): Promise<string> {
    return (await this.pages.rotmHomePgHaveLinkToMaterialPage.getRotmHeaderLink()).trim();
  }

  async ansDoYouHaveLinkToTheMaterial(applicant: RotmApplicant) {
    await this.pages.rotmHomePgHaveLinkToMaterialPage.assertPageTitle(this.pages.rotmHomePgHaveLinkToMaterialPage.page, await this.pages.rotmHomePgHaveLinkToMaterialPage.expectedPageTitle());
    await this.pages.basePage.refreshPage();
    expect(await this.pages.rotmHomePgHaveLinkToMaterialPage.isHelpMeFindLinkSummaryTextDisplayed()).toBe(true);

    switch (applicant.doYouHaveLinkToTheMaterial.toLowerCase()) {
      case c.HAVE_LINK.toLowerCase():
        await this.pages.rotmHomePgHaveLinkToMaterialPage.answerYesHaveLinkToMaterial(c.HAVE_LINK, c.LINK_TO_MATERIAL);

        if (applicant.additionalLinksToTheMaterial === 4) {
          await this.pages.rotmHomePgHaveLinkToMaterialPage.addAnotherLink(applicant.additionalLinksToTheMaterial, c.LINK_TO_MATERIAL);
          await this.pages.rotmHomePgHaveLinkToMaterialPage.removeLink(applicant.additionalLinksToTheMaterial);
          await this.pages.rotmHomePgHaveLinkToMaterialPage.addAnotherLink(applicant.additionalLinksToTheMaterial, c.LINK_TO_MATERIAL);
        } else {
          await this.pages.rotmHomePgHaveLinkToMaterialPage.addAnotherLink(applicant.additionalLinksToTheMaterial, c.LINK_TO_MATERIAL);
        }
        break;

      case c.DO_NOT_HAVE_LINK.toLowerCase():
        await this.pages.rotmHomePgHaveLinkToMaterialPage.answerNoDontHaveLink(c.DO_NOT_HAVE_LINK);
        break;

      default:
        throw new Error(`Invalid link-to-material option: ${applicant.doYouHaveLinkToTheMaterial}`);
    }

    await this.pages.basePage.clickContinueButton();
  }

  async ansDoYouHaveEvidence(applicant: RotmApplicant) {
    await this.pages.rotmDoYouHaveEvidencePage.assertPageTitle(this.pages.rotmDoYouHaveEvidencePage.page, await this.pages.rotmDoYouHaveEvidencePage.expectedPageTitle());
    expect(await this.pages.rotmDoYouHaveEvidencePage.checkHelpMeTakeScreenshotLinkIsWorking()).toBe(true);

    switch (applicant.doYouHaveAnyEvidence.toLowerCase()) {
      case c.HAVE_EVIDENCE.toLowerCase():
        await this.pages.rotmDoYouHaveEvidencePage.answerYesHaveEvidence(c.HAVE_EVIDENCE);
        await this.ansDoYouWantToUploadAnotherFile(applicant);
        break;

      case c.NO_EVIDENCE.toLowerCase():
        await this.pages.rotmDoYouHaveEvidencePage.answerNoDontHaveLink(c.NO_EVIDENCE);
        break;

      default:
        throw new Error(`Invalid evidence option: ${applicant.doYouHaveAnyEvidence}`);
    }
  }

  async ansDoYouWantToUploadAnotherFile(applicant: RotmApplicant) {
    await this.pages.rotmUploadAnotherFilePage.assertPageTitle(this.pages.rotmUploadAnotherFilePage.page, await this.pages.rotmUploadAnotherFilePage.expectedPageTitle());
    expect(await this.pages.rotmUploadAnotherFilePage.isPreviousDocAdded()).toBe(true);

    switch (applicant.doYouWantToUploadAnotherFile.toLowerCase()) {
      case 'yes':
        await this.pages.rotmUploadAnotherFilePage.answerUploadAnotherFileYes(c.RESPONSE_YES);
        await this.pages.rotmUploadAnotherFilePage.answerUploadAnotherFileNo(c.RESPONSE_NO);
        break;

      case 'no':
        await this.pages.rotmUploadAnotherFilePage.answerUploadAnotherFileNo(c.RESPONSE_NO);
        break;

      default:
        throw new Error(`Invalid upload-another-file option: ${applicant.doYouWantToUploadAnotherFile}`);
    }
  }

  async ansAnythingElseYouCanTellUs() {
    await this.pages.rotmAnythingElseYouCanTellUsPage.assertPageTitle(this.pages.rotmAnythingElseYouCanTellUsPage.page, await this.pages.rotmAnythingElseYouCanTellUsPage.expectedPageTitle());
    await this.pages.rotmAnythingElseYouCanTellUsPage.answerEnterAdditionalDetails(c.ADDITIONAL_DETAILS);
  }

  async ansWillingToBeContacted(applicant: RotmApplicant) {
    await this.pages.rotmAreYouWillingToBeContactedPage.assertPageTitle(this.pages.rotmAreYouWillingToBeContactedPage.page, await this.pages.rotmAreYouWillingToBeContactedPage.expectedPageTitle());

    switch (applicant.areYouWillingToBeContacted.toLowerCase()) {
      case c.GIVE_CONTACT.toLowerCase():
        await this.pages.rotmAreYouWillingToBeContactedPage.answerAreYouWillingToBeContacted(c.GIVE_CONTACT);
        await this.ansYourContactDetails(applicant);
        await this.pages.basePage.clickContinueButton();
        break;

      case c.DO_NOT_GIVE_CONTACT.toLowerCase():
        await this.pages.rotmAreYouWillingToBeContactedPage.answerAreYouWillingToBeContacted(c.DO_NOT_GIVE_CONTACT);
        break;

      default:
        throw new Error(`Invalid contact-consent option: ${applicant.areYouWillingToBeContacted}`);
    }
  }

  async ansYourContactDetails(applicant: RotmApplicant) {
    await this.pages.rotmWhatAreYourContactDetailsPage.assertPageTitle(this.pages.rotmWhatAreYourContactDetailsPage.page, await this.pages.rotmWhatAreYourContactDetailsPage.expectedPageTitle());
    await this.pages.rotmWhatAreYourContactDetailsPage.answerYourFullName(c.FULL_NAME);

    switch (applicant.whatAreYourContactDetails.toLowerCase()) {
      case c.TENANTS_EMAIL.toLowerCase():
        await this.pages.rotmWhatAreYourContactDetailsPage.answerSelectContact(c.TENANTS_EMAIL, c.SAS_HOF_EMAIL);
        break;

      case c.TELEPHONE_LABEL.toLowerCase():
        await this.pages.rotmWhatAreYourContactDetailsPage.answerSelectContact(c.TELEPHONE_LABEL, c.TELEPHONE);
        break;

      case c.BOTH_CONTACTS.toLowerCase():
        await this.pages.rotmWhatAreYourContactDetailsPage.answerSelectContact(c.TENANTS_EMAIL, c.SAS_HOF_EMAIL);
        await this.pages.rotmWhatAreYourContactDetailsPage.answerSelectContact(c.TELEPHONE_LABEL, c.TELEPHONE);
        break;

      default:
        throw new Error(`Invalid contact-details option: ${applicant.whatAreYourContactDetails}`);
    }
  }

  async ansCheckYourReport() {
    await this.pages.rotmCheckYourReportPage.assertPageTitle(this.pages.rotmCheckYourReportPage.page, await this.pages.rotmCheckYourReportPage.expectedPageTitle());
  }

  async getReportSubmissionMessage(): Promise<string> {
    await this.pages.rotmCheckYourReportPage.ansSendReport();
    return this.pages.rotmCheckYourReportPage.getReportSentText();
  }

  async addAdditionalLinks(addLinks: number) {
    await this.pages.rotmCheckYourReportPage.navigateBackToHomePage();
    await this.pages.rotmHomePgHaveLinkToMaterialPage.addAnotherLink(addLinks, c.LINK_TO_MATERIAL);
    await this.pages.basePage.clickContinueButton();
    await this.pages.rotmDoYouHaveEvidencePage.answerNoDontHaveLink(c.NO_EVIDENCE);
    await this.pages.rotmAnythingElseYouCanTellUsPage.answerEnterAdditionalDetails(`Added ${addLinks} additional links to material`);
    await this.pages.rotmAreYouWillingToBeContactedPage.answerAreYouWillingToBeContacted(c.DO_NOT_GIVE_CONTACT);
  }

  async navigateBackToHomePage() {
    await this.pages.rotmCheckYourReportPage.navigateBackToHomePage();
    await this.pages.rotmHomePgHaveLinkToMaterialPage.assertPageTitle(this.pages.rotmHomePgHaveLinkToMaterialPage.page, await this.pages.rotmHomePgHaveLinkToMaterialPage.expectedPageTitle());
  }

  async verifyAdditionalLinksAreAdded(): Promise<number> {
    return this.pages.rotmCheckYourReportPage.getAdditionalLinks();
  }

  async getErrorSummaryHeaderText(): Promise<string | null> {
    return this.pages.basePage.getThereIsAProblemTextErrorText();
  }

  async getErrorMessageDetailText(): Promise<string> {
    return this.pages.basePage.getErrorMessageDetailText();
  }

  async selectLinkToMaterial(option: string) {
    await this.pages.rotmHomePgHaveLinkToMaterialPage.answerYesHaveLinkToMaterial(option, c.LINK_TO_MATERIAL);
    await this.pages.basePage.clickContinueButton();
  }

  async selectEvidence(option: string) {
    await this.pages.rotmDoYouHaveEvidencePage.answerYesHaveEvidence(option);
  }

  async selectMoreEvidence(response: string) {
    await this.pages.rotmUploadAnotherFilePage.answerUploadAnotherFileNo(response);
  }

  async selectContactDetails(option: string) {
    await this.pages.rotmAreYouWillingToBeContactedPage.answerAreYouWillingToBeContacted(option);
  }

  async enterYourContactDetails() {
    await this.pages.rotmWhatAreYourContactDetailsPage.answerYourFullName(c.FULL_NAME);
    await this.pages.rotmWhatAreYourContactDetailsPage.answerSelectContact(c.TELEPHONE_LABEL, c.TELEPHONE);
    await this.pages.basePage.clickContinueButton();
  }
}

Given('Test data has been created for {string} scenarios', async ({}, service: string) => {
  expect(service).toBe('ROTM');
});

Given('I selected the data for scenario {string} - {string}', async ({}, scenarioId: string, description: string) => {
  selectedApplicant = getRotmApplicantForScenario(scenarioId, description);
});

When('I visit the Rotm page', async ({ pages }) => {
  await new BficStepLib(pages).openRotmHomePage();
});

Then('I see the Rotm header link service name {string}', async ({ pages }, rotmHeaderLinkName: string) => {
  await expect(await new BficStepLib(pages).getRotmHeaderLinkServiceName()).toEqual(rotmHeaderLinkName);
});

When('I fill out my answers for the Rotm questionnaire', async ({ pages }) => {
  const stepLib = new BficStepLib(pages);
  await stepLib.ansDoYouHaveLinkToTheMaterial(selectedApplicant);
  await stepLib.ansDoYouHaveEvidence(selectedApplicant);
  await stepLib.ansAnythingElseYouCanTellUs();
  await stepLib.ansWillingToBeContacted(selectedApplicant);
});

Then('I check my report for Rotm', async ({ pages }) => {
  await new BficStepLib(pages).ansCheckYourReport();
});

Then('I am able to submit the Rotm questionnaire', async ({ pages }) => {
  await expect(await new BficStepLib(pages).getReportSubmissionMessage()).toEqual('Report sent');
});

Then('I am able to navigate back to ROTM home page', async ({ pages }) => {
  await new BficStepLib(pages).navigateBackToHomePage();
});

When('I add {int} additional links to my report and continue', async ({ pages }, addLinks: number) => {
  await new BficStepLib(pages).addAdditionalLinks(addLinks);
});

Then('I check the change is updated to {int} links on the \'Check your report\' page and continue', async ({ pages }, links: number) => {
  await expect(await new BficStepLib(pages).verifyAdditionalLinksAreAdded()).toEqual(links);
});

When('I select continue', async ({ pages }) => {
  await pages.basePage.clickContinueButton();
});

Then('I see {string} error message displayed for ROTM', async ({ pages }, expectedErrorMessage: string) => {
  await expect(await new BficStepLib(pages).getErrorMessageDetailText()).toEqual(expectedErrorMessage);
});

Then('I see error message displayed for ROTM', async ({ pages }, expectedErrorMessage: string) => {
  await expect(await new BficStepLib(pages).getErrorMessageDetailText()).toEqual(expectedErrorMessage.trim());
});

Then('I see {string} error header message displayed for ROTM', async ({ pages }, expectedErrorMessage: string) => {
  await expect(await new BficStepLib(pages).getErrorSummaryHeaderText()).toEqual(expectedErrorMessage);
});

When('I select {string} link to material and click continue', async ({ pages }, option: string) => {
  await new BficStepLib(pages).selectLinkToMaterial(option);
});

When('I select {string} for evidence and click continue', async ({ pages }, evidence: string) => {
  await new BficStepLib(pages).selectEvidence(evidence);
});

When('I select {string} for more evidence and click continue', async ({ pages }, additionalEvidence: string) => {
  await new BficStepLib(pages).selectMoreEvidence(additionalEvidence);
});

When('I select {string} to give contact details and click continue', async ({ pages }, giveContact: string) => {
  await new BficStepLib(pages).selectContactDetails(giveContact);
});

When('I enter my contact details for ROTM and click continue', async ({ pages }) => {
  await new BficStepLib(pages).enterYourContactDetails();
});

When('I am on the \'Check your report\' page', async ({ pages }) => {
  await new BficStepLib(pages).ansCheckYourReport();
});