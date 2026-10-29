import { Locator, Page } from '@playwright/test';
import { basePage } from './base-page';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

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

  async enterYourFullName(fullName: string) {
    await this.type(this.fullNameTextField, fullName);
  }

  async selectContact(label: string, contact: string) {
    await this.selectRadioOrCheckboxOption(label);
    await this.type(this.inputForSelectedContact(label), contact);
  }

  async completeContactDetailsPage(contact: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.enterYourFullName(c.FULL_NAME);
    if (contact === c.EMAIL_LABEL || contact === c.BOTH_CONTACTS) {
      await this.selectContact(c.EMAIL_LABEL, c.SAS_HOF_EMAIL);
    }
    if (contact === c.TELEPHONE_LABEL || contact === c.BOTH_CONTACTS) {
      await this.selectContact(c.TELEPHONE_LABEL, c.TELEPHONE);
    }
    if (contact !== c.EMAIL_LABEL && contact !== c.TELEPHONE_LABEL && contact !== c.BOTH_CONTACTS) {
      throw new Error(`Invalid contact-details option: ${contact}`);
    }
    await this.clickContinueButton();
  }

  private inputForSelectedContact(label: string): Locator {
    return label.toLowerCase() === 'telephone'
      ? this.page.locator('#contact-phone')
      : this.page.locator('#contact-email');
  }
}