import { Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class rotmWhatAreYourContactDetailsPage extends basePage {
  readonly fullNameTextField: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameTextField = page.locator('#contact-details-name');
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: What are your contact details? – Report online material promoting terrorism or extremism'
      : 'What are your contact details? – Report online material promoting terrorism or extremism';
  }

  async answerYourFullName(fullName: string) {
    await this.type(this.fullNameTextField, fullName);
  }

  async answerSelectContact(label: string, contact: string) {
    await this.selectRadioOrCheckboxOption(label);
    await this.type(this.inputForSelectedContact(label), contact);
  }

  private inputForSelectedContact(label: string): Locator {
    return label.toLowerCase() === 'telephone'
      ? this.page.locator('#contact-phone')
      : this.page.locator('#contact-email');
  }
}