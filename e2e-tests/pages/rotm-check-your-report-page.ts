import { Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class rotmCheckYourReportPage extends basePage {
  readonly sendReportBtn: Locator;
  readonly reportSentText: Locator;
  readonly linkText: Locator;

  constructor(page: Page) {
    super(page);
    this.sendReportBtn = page.getByRole('button', { name: 'Send report' }).or(page.locator("input[value='Send report']"));
    this.reportSentText = page.getByRole('heading', { name: 'Report sent' });
    this.linkText = page.locator("th:has-text('Link') + td ul li");
  }

  async expectedPageTitle(): Promise<string> {
    return 'Check your report – Report online material promoting terrorism or extremism';
  }

  async getAdditionalLinks(): Promise<number> {
    return this.linkText.count();
  }

  async ansSendReport() {
    await this.sendReportBtn.first().click();
  }

  async getReportSentText(): Promise<string> {
    return ((await this.reportSentText.textContent()) || '').trim();
  }

  async navigateBackToHomePage() {
    await this.page.getByRole('link', { name: 'Report online material promoting terrorism or extremism' }).click();
  }
}