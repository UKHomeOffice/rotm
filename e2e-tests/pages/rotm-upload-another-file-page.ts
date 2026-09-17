import { expect, Locator, Page } from '@playwright/test';
import { rotmCommonPage } from './rotm-common-page';

export class rotmUploadAnotherFilePage extends rotmCommonPage {
  readonly filesAddedMessage: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.filesAddedMessage = page.getByRole('heading', { name: 'Files added' });
    this.deleteButton = page.getByRole('link', { name: /delete/i });
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();

    return title.startsWith('Error')
      ? 'Error: Do you want to upload another file? – Report online material promoting terrorism or extremism'
      : 'Do you want to upload another file? – Report online material promoting terrorism or extremism';
  }

  async isPreviousDocAdded(): Promise<boolean> {
    await expect(this.deleteButton.first()).toBeVisible();
    await expect(this.filesAddedMessage).toBeVisible();
    return true;
  }

  async answerUploadAnotherFileYes(response: string) {
    await this.uploadEvidence(response);
    await this.clickContinueButton();
  }

  async answerUploadAnotherFileNo(response: string) {
    await this.refreshPage();
    await this.selectRadioOrCheckboxOption(response);
    await this.clickContinueButton();
  }
}