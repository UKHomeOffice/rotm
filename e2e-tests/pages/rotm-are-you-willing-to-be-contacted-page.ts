import { Page } from '@playwright/test';
import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export class rotmAreYouWillingToBeContactedPage extends basePage {
  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Are you willing to be contacted, if necessary? – Report online material promoting terrorism or extremism'
      : 'Are you willing to be contacted, if necessary? – Report online material promoting terrorism or extremism';
  }

  async answerAreYouWillingToBeContacted(response: string) {
    await this.selectRadioOrCheckboxOption(response);
    await this.clickContinueButton();
    await this.page
      .getByRole('heading', { name: 'What are your contact details?' })
      .or(this.page.getByRole('heading', { name: 'Check your report' }))
      .waitFor();
  }

  async completeContactConsentPage(option: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    if (option !== c.GIVE_CONTACT && option !== c.DO_NOT_GIVE_CONTACT) {
      throw new Error(`Invalid contact-consent option: ${option}`);
    }
    await this.answerAreYouWillingToBeContacted(option);
  }
}