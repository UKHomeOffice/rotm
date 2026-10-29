import { Page } from '@playwright/test';
import { basePage } from './base-page';

export class rotmAnythingElseYouCanTellUsPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return 'Is there anything else you can tell us? – Report online material promoting terrorism or extremism';
  }

  async answerEnterAdditionalDetails(additionalDetails: string) {
    await this.type(this.page.getByLabel('Additional details'), additionalDetails);
    await this.clickContinueButton();
  }

  async completeAdditionalDetailsPage(additionalDetails: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerEnterAdditionalDetails(additionalDetails);
  }
}