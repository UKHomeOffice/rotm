import { test as base } from 'playwright-bdd';
import { basePage } from '../pages/base-page';
import { rotmAnythingElseYouCanTellUsPage } from '../pages/rotm-anything-else-you-can-tell-us-page';
import { rotmAreYouWillingToBeContactedPage } from '../pages/rotm-are-you-willing-to-be-contacted-page';
import { rotmCheckYourReportPage } from '../pages/rotm-check-your-report-page';
import { rotmCommonPage } from '../pages/rotm-common-page';
import { rotmDoYouHaveEvidencePage } from '../pages/rotm-do-you-have-evidence-page';
import { rotmHomePgHaveLinkToMaterialPage } from '../pages/rotm-home-pg-have-link-to-material-page';
import { rotmUploadAnotherFilePage } from '../pages/rotm-upload-another-file-page';
import { rotmWhatAreYourContactDetailsPage } from '../pages/rotm-what-are-your-contact-details-page';

export type Pages = {
  basePage: basePage;
  rotmCommonPage: rotmCommonPage;
  rotmHomePgHaveLinkToMaterialPage: rotmHomePgHaveLinkToMaterialPage;
  rotmDoYouHaveEvidencePage: rotmDoYouHaveEvidencePage;
  rotmUploadAnotherFilePage: rotmUploadAnotherFilePage;
  rotmAnythingElseYouCanTellUsPage: rotmAnythingElseYouCanTellUsPage;
  rotmAreYouWillingToBeContactedPage: rotmAreYouWillingToBeContactedPage;
  rotmWhatAreYourContactDetailsPage: rotmWhatAreYourContactDetailsPage;
  rotmCheckYourReportPage: rotmCheckYourReportPage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    await use({
      basePage: new basePage(page),
      rotmCommonPage: new rotmCommonPage(page),
      rotmHomePgHaveLinkToMaterialPage: new rotmHomePgHaveLinkToMaterialPage(page),
      rotmDoYouHaveEvidencePage: new rotmDoYouHaveEvidencePage(page),
      rotmUploadAnotherFilePage: new rotmUploadAnotherFilePage(page),
      rotmAnythingElseYouCanTellUsPage: new rotmAnythingElseYouCanTellUsPage(page),
      rotmAreYouWillingToBeContactedPage: new rotmAreYouWillingToBeContactedPage(page),
      rotmWhatAreYourContactDetailsPage: new rotmWhatAreYourContactDetailsPage(page),
      rotmCheckYourReportPage: new rotmCheckYourReportPage(page),
    });
  },
});

export const expect = test.expect;