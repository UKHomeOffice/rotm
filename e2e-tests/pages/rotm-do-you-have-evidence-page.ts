import { expect, Locator, Page } from '@playwright/test';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { basePage } from './base-page';

export class rotmDoYouHaveEvidencePage extends basePage {
  readonly helpMeTakeScreenshotLink: Locator;
  readonly tabsList: Locator;
  readonly sectionLinks: Locator;
  readonly otherComputerTab: Locator;

  constructor(page: Page) {
    super(page);
    this.helpMeTakeScreenshotLink = page.getByText('Help me take a screenshot');
    this.tabsList = page.getByRole('tab');
    this.sectionLinks = page.getByRole('tabpanel').getByRole('link');
    this.otherComputerTab = page.getByRole('tabpanel', { name: 'All other computers' });
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Do you have any evidence? – Report online material promoting terrorism or extremism'
      : 'Do you have any evidence? – Report online material promoting terrorism or extremism';
  }

  async answerYesHaveEvidence(label: string) {
    await this.refreshPage();
    await this.uploadEvidence(label);
    await this.clickContinueButton();
  }

  async answerNoDontHaveLink(label: string) {
    await this.selectRadioOrCheckboxOption(label);
    await this.clickContinueButton();
  }

  async completeEvidencePage(option: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    expect(await this.checkHelpMeTakeScreenshotLinkIsWorking()).toBe(true);
    if (option === c.NO_EVIDENCE) {
      await this.answerNoDontHaveLink(option);
    } else if (option === c.HAVE_EVIDENCE) {
      await this.answerYesHaveEvidence(option);
    } else {
      throw new Error(`Invalid evidence option: ${option}`);
    }
  }

  async checkHelpMeTakeScreenshotLinkIsWorking(): Promise<boolean> {
    await this.helpMeTakeScreenshotLink.click();
    const tabNames = ['Mac', 'Chromebook', 'All other computers'];

    for (const tabName of tabNames) {
      const tab = this.page.getByRole('tab', { name: tabName, exact: true });
      await tab.click();

      if (tabName.toLowerCase() === 'mac' || tabName.toLowerCase() === 'chromebook') {
        const link = this.page.getByRole('tabpanel', { name: tabName, exact: true }).getByRole('link').first();
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('href', /^https:\/\//);
      }

      if (tabName.toLowerCase() === 'all other computers') {
        await expect(this.otherComputerTab).toBeVisible();
      }
    }

    await this.helpMeTakeScreenshotLink.click();
    return true;
  }
}