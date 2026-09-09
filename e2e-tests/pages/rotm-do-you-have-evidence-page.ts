import { expect, Locator, Page } from '@playwright/test';
import { rotmCommonPage } from './rotm-common-page';

export class rotmDoYouHaveEvidencePage extends rotmCommonPage {
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

  async checkHelpMeTakeScreenshotLinkIsWorking(): Promise<boolean> {
    await this.helpMeTakeScreenshotLink.click();
    const tabNames = ['Mac', 'Chromebook', 'All other computers'];

    for (const tabName of tabNames) {
      const tab = this.page.getByRole('tab', { name: tabName, exact: true });
      await tab.click();

      if (tabName.toLowerCase() === 'mac' || tabName.toLowerCase() === 'chromebook') {
        const link = this.page.getByRole('tabpanel', { name: tabName, exact: true }).getByRole('link').first();

        if (await link.isVisible()) {
          await link.click();
          await this.page.goBack();
          await this.helpMeTakeScreenshotLink.click();
        }
      }

      if (tabName.toLowerCase() === 'all other computers') {
        await expect(this.otherComputerTab).toBeVisible();
      }
    }

    await this.helpMeTakeScreenshotLink.click();
    return true;
  }
}