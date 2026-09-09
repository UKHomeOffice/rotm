import path from 'path';
import { Locator, Page } from '@playwright/test';
import { basePage } from './base-page';

export class rotmCommonPage extends basePage {
  readonly chooseFile: Locator;

  constructor(page: Page) {
    super(page);
    this.chooseFile = page.locator("input[id*='image']");
  }

  async uploadEvidence(label: string) {
    await this.selectRadioOrCheckboxOption(label);
    await this.chooseFile.first().setInputFiles(path.resolve('e2e-tests/utility-helper/no-preview.png'));
  }
}