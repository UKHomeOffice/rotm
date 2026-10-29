import { expect, Locator, Page } from '@playwright/test';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { basePage } from './base-page';

export class rotmUploadAnotherFilePage extends basePage {
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

  async completeUploadPage(anotherFile: string) {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    expect(await this.isPreviousDocAdded()).toBe(true);
    if (anotherFile === c.RESPONSE_YES) {
      await this.answerUploadAnotherFileYes(c.RESPONSE_YES);
    } else if (anotherFile !== c.RESPONSE_NO) {
      throw new Error(`Invalid upload-another-file option: ${anotherFile}`);
    }
    await this.answerUploadAnotherFileNo(c.RESPONSE_NO);
  }
}