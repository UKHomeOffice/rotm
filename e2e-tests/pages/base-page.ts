import { expect, Locator, Page } from '@playwright/test';
import path from 'path';

export class basePage {
  readonly page: Page;
  readonly headerText: Locator;
  readonly continueButton: Locator;
  readonly chooseFile: Locator;
  readonly thereIsAProblemText: Locator;
  readonly errorSummaryList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerText = page.locator('h1');
    this.continueButton = page.getByRole('button', { name: /continue/i }).or(page.locator("input[value='Continue']"));
    this.chooseFile = page.locator("input[id*='image']");
    this.thereIsAProblemText = page.locator('#error-summary-title');
    this.errorSummaryList = page.locator('.govuk-error-summary__list');
  }

  async assertPageTitle(page: Page, title: string) {
    await expect(page).toHaveTitle(title + ' – GOV.UK');
  }

  async click(locator: Locator) {
    await expect(locator).toBeVisible();
    await expect(locator).toBeEnabled();
    await locator.click();
  }

  async type(locator: Locator, text: string) {
    await locator.fill(text);
    await this.page.keyboard.press('Tab');
  }

  async clickContinueButton() {
    await this.click(this.continueButton);
  }

  async selectRadioOrCheckboxOption(label: string) {
    await this.page.getByLabel(label, { exact: true }).check();
  }

  async uploadFile(label: string, fileName: string) {
    await this.selectRadioOrCheckboxOption(label);
    await this.chooseFile.first().setInputFiles(path.resolve(`e2e-tests/test-data/${fileName}`));
  }

  async getThereIsAProblemTextErrorText(): Promise<string | null> {
    return this.thereIsAProblemText.textContent();
  }

  async getErrorMessageDetailText(): Promise<string> {
    const text = await this.errorSummaryList.textContent();
    return (text || '').replaceAll('\t', '').trim();
  }
}