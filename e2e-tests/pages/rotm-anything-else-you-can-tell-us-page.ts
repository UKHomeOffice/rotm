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
}