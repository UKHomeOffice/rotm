import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class rotmHomePgHaveLinkToMaterialPage extends basePage {
  readonly rotmLink: Locator;
  readonly helpMeFindLink: Locator;
  readonly helpMeFindLinkAppears: Locator;
  readonly urlTextbox: Locator;
  readonly acceptCookieButton: Locator;
  readonly hideThisMessageButton: Locator;
  readonly startButton: Locator;

  constructor(page: Page) {
    super(page);
    this.rotmLink = page.getByRole('link', { name: 'Report online material promoting terrorism or extremism' });
    this.helpMeFindLink = page.getByText('Help me find the link');
    this.helpMeFindLinkAppears = page.getByAltText('The link appears in the bar at the top of your devices screen');
    this.urlTextbox = page.locator('#url');
    this.acceptCookieButton = page.locator('#accept-cookies-button');
    this.hideThisMessageButton = page.locator('#hide-accept-cookie-banner');
    this.startButton = page.getByRole('link', { name: 'Start now' });
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Do you have a link to the material? – Report online material promoting terrorism or extremism'
      : 'Do you have a link to the material? – Report online material promoting terrorism or extremism';
  }

  async openRotmHomePage() {
    await this.page.goto('/');

    if (await this.acceptCookieButton.isVisible()) {
      await this.click(this.acceptCookieButton);
    }

    if (await this.hideThisMessageButton.isVisible()) {
      await this.click(this.hideThisMessageButton);
    }

    if (await this.startButton.isVisible()) {
      await this.click(this.startButton);
    }
  }

  async getRotmHeaderLink(): Promise<string> {
    return (await this.rotmLink.textContent()) || '';
  }

  async answerYesHaveLinkToMaterial(label: string, link: string) {
    await this.selectRadioOrCheckboxOption(label);
    await this.type(this.urlTextbox, link);
  }

  async answerNoDontHaveLink(label: string) {
    await this.selectRadioOrCheckboxOption(label);
  }

  async isHelpMeFindLinkSummaryTextDisplayed(): Promise<boolean> {
    await this.helpMeFindLink.click();
    await expect(this.helpMeFindLinkAppears).toBeVisible();
    await this.helpMeFindLink.click();
    return true;
  }

  async addAnotherLink(links: number, link: string) {
    for (let linkNumber = 1; linkNumber <= links; linkNumber += 1) {
      await this.page.getByRole('link', { name: 'Add another link' }).click();
      await this.type(this.page.locator(`#another-url-${linkNumber}`), link);
    }
  }

  async removeLink(links: number) {
    for (let linkNumber = links; linkNumber >= 1; linkNumber -= 1) {
      await this.page.locator(`#another-url-${linkNumber} + a`).click();

      if (linkNumber === 1) {
        break;
      }
    }
  }
}