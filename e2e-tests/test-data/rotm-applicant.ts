import { ConstantsLib as c } from '../utility-helper/constants-lib';

export type RotmApplicant = {
  scenarioId: string;
  description: string;
  doYouHaveLinkToTheMaterial: string;
  additionalLinksToTheMaterial: number;
  doYouHaveAnyEvidence: string;
  doYouWantToUploadAnotherFile: string;
  areYouWillingToBeContacted: string;
  whatAreYourContactDetails: string;
};

export function getRotmApplicantForScenario(scenarioId: string, description: string): RotmApplicant {
  let applicant: RotmApplicant;

  switch (scenarioId) {
    case '1':
      applicant = {
        scenarioId: '1',
        description: 'S1 - Have (0 additional) link to the material - Have evidence - Another file-Yes - Email contact',
        doYouHaveLinkToTheMaterial: c.HAVE_LINK,
        additionalLinksToTheMaterial: 0,
        doYouHaveAnyEvidence: c.HAVE_EVIDENCE,
        doYouWantToUploadAnotherFile: c.RESPONSE_YES,
        areYouWillingToBeContacted: c.GIVE_CONTACT,
        whatAreYourContactDetails: c.TENANTS_EMAIL,
      };
      break;
    case '2':
      applicant = {
        scenarioId: '2',
        description: 'S3 - Have (4 additional) links to the material-remove links and add again - Have evidence - Another file-Yes- Email & Telephone contacts',
        doYouHaveLinkToTheMaterial: c.HAVE_LINK,
        additionalLinksToTheMaterial: 4,
        doYouHaveAnyEvidence: c.HAVE_EVIDENCE,
        doYouWantToUploadAnotherFile: c.RESPONSE_YES,
        areYouWillingToBeContacted: c.GIVE_CONTACT,
        whatAreYourContactDetails: c.BOTH_CONTACTS,
      };
      break;
    case '3':
      applicant = {
        scenarioId: '3',
        description: 'S4 - Have (3 additional) links to the material - Have evidence - Another file-Yes - No contact',
        doYouHaveLinkToTheMaterial: c.HAVE_LINK,
        additionalLinksToTheMaterial: 3,
        doYouHaveAnyEvidence: c.HAVE_EVIDENCE,
        doYouWantToUploadAnotherFile: c.RESPONSE_YES,
        areYouWillingToBeContacted: c.DO_NOT_GIVE_CONTACT,
        whatAreYourContactDetails: 'NA',
      };
      break;
    case '4':
      applicant = {
        scenarioId: '4',
        description: 'S8 - Have (1 additional) link to the material - No evidence - Another file-Yes - Email & Telephone contacts',
        doYouHaveLinkToTheMaterial: c.HAVE_LINK,
        additionalLinksToTheMaterial: 1,
        doYouHaveAnyEvidence: c.NO_EVIDENCE,
        doYouWantToUploadAnotherFile: 'NA',
        areYouWillingToBeContacted: c.GIVE_CONTACT,
        whatAreYourContactDetails: c.BOTH_CONTACTS,
      };
      break;
    case '5':
      applicant = {
        scenarioId: '5',
        description: "S9 - Don't have link - Have evidence - Another file-Yes - Email contact",
        doYouHaveLinkToTheMaterial: c.DO_NOT_HAVE_LINK,
        additionalLinksToTheMaterial: 0,
        doYouHaveAnyEvidence: c.HAVE_EVIDENCE,
        doYouWantToUploadAnotherFile: c.RESPONSE_YES,
        areYouWillingToBeContacted: c.GIVE_CONTACT,
        whatAreYourContactDetails: c.TENANTS_EMAIL,
      };
      break;
    case '6':
      applicant = {
        scenarioId: '6',
        description: "S16 - Don't have link - No evidence - Yes contact - Email & Telephone contacts",
        doYouHaveLinkToTheMaterial: c.DO_NOT_HAVE_LINK,
        additionalLinksToTheMaterial: 0,
        doYouHaveAnyEvidence: c.NO_EVIDENCE,
        doYouWantToUploadAnotherFile: 'NA',
        areYouWillingToBeContacted: c.GIVE_CONTACT,
        whatAreYourContactDetails: c.BOTH_CONTACTS,
      };
      break;
    case '7':
      applicant = {
        scenarioId: '7',
        description: 'S2 - Have (0 additional) link to the material - Have evidence - Another file-Yes- Telephone contact',
        doYouHaveLinkToTheMaterial: c.HAVE_LINK,
        additionalLinksToTheMaterial: 0,
        doYouHaveAnyEvidence: c.HAVE_EVIDENCE,
        doYouWantToUploadAnotherFile: c.RESPONSE_YES,
        areYouWillingToBeContacted: c.GIVE_CONTACT,
        whatAreYourContactDetails: c.TELEPHONE_LABEL,
      };
      break;
    case '8':
      applicant = {
        scenarioId: '8',
        description: 'S5 - Have (2 additional) links to the material - Have evidence - Another file-No - No contact',
        doYouHaveLinkToTheMaterial: c.HAVE_LINK,
        additionalLinksToTheMaterial: 2,
        doYouHaveAnyEvidence: c.HAVE_EVIDENCE,
        doYouWantToUploadAnotherFile: c.RESPONSE_NO,
        areYouWillingToBeContacted: c.DO_NOT_GIVE_CONTACT,
        whatAreYourContactDetails: 'NA',
      };
      break;
    case '9':
      applicant = {
        scenarioId: '9',
        description: 'S6 - Have (1 additional) link to the material - No evidence - Another file-Yes - Email contact',
        doYouHaveLinkToTheMaterial: c.HAVE_LINK,
        additionalLinksToTheMaterial: 1,
        doYouHaveAnyEvidence: c.NO_EVIDENCE,
        doYouWantToUploadAnotherFile: 'NA',
        areYouWillingToBeContacted: c.GIVE_CONTACT,
        whatAreYourContactDetails: c.TENANTS_EMAIL,
      };
      break;
    case '10':
      applicant = {
        scenarioId: '10',
        description: 'S7 - Have (1 additional) link to the material - No evidence - Another file-Yes - Telephone contact',
        doYouHaveLinkToTheMaterial: c.HAVE_LINK,
        additionalLinksToTheMaterial: 1,
        doYouHaveAnyEvidence: c.NO_EVIDENCE,
        doYouWantToUploadAnotherFile: 'NA',
        areYouWillingToBeContacted: c.GIVE_CONTACT,
        whatAreYourContactDetails: c.TELEPHONE_LABEL,
      };
      break;
    case '11':
      applicant = {
        scenarioId: '11',
        description: "S10 - Don't have link - Have evidence - Another file-Yes - Telephone contact",
        doYouHaveLinkToTheMaterial: c.DO_NOT_HAVE_LINK,
        additionalLinksToTheMaterial: 0,
        doYouHaveAnyEvidence: c.HAVE_EVIDENCE,
        doYouWantToUploadAnotherFile: c.RESPONSE_YES,
        areYouWillingToBeContacted: c.GIVE_CONTACT,
        whatAreYourContactDetails: c.TELEPHONE_LABEL,
      };
      break;
    case '12':
      applicant = {
        scenarioId: '12',
        description: "S11 - Don't have link - Have evidence - Another file-Yes - Email & Telephone contacts",
        doYouHaveLinkToTheMaterial: c.DO_NOT_HAVE_LINK,
        additionalLinksToTheMaterial: 0,
        doYouHaveAnyEvidence: c.HAVE_EVIDENCE,
        doYouWantToUploadAnotherFile: c.RESPONSE_YES,
        areYouWillingToBeContacted: c.GIVE_CONTACT,
        whatAreYourContactDetails: c.BOTH_CONTACTS,
      };
      break;
    case '13':
      applicant = {
        scenarioId: '13',
        description: "S12 - Don't have link - Have evidence - Another file-Yes - No contact",
        doYouHaveLinkToTheMaterial: c.DO_NOT_HAVE_LINK,
        additionalLinksToTheMaterial: 0,
        doYouHaveAnyEvidence: c.HAVE_EVIDENCE,
        doYouWantToUploadAnotherFile: c.RESPONSE_YES,
        areYouWillingToBeContacted: c.DO_NOT_GIVE_CONTACT,
        whatAreYourContactDetails: 'NA',
      };
      break;
    case '14':
      applicant = {
        scenarioId: '14',
        description: "S13 - Don't have link - Have evidence - Another file-No - No contact",
        doYouHaveLinkToTheMaterial: c.DO_NOT_HAVE_LINK,
        additionalLinksToTheMaterial: 0,
        doYouHaveAnyEvidence: c.HAVE_EVIDENCE,
        doYouWantToUploadAnotherFile: c.RESPONSE_NO,
        areYouWillingToBeContacted: c.DO_NOT_GIVE_CONTACT,
        whatAreYourContactDetails: 'NA',
      };
      break;
    case '15':
      applicant = {
        scenarioId: '15',
        description: "S14 - Don't have link - No evidence - Yes contact - Email contact",
        doYouHaveLinkToTheMaterial: c.DO_NOT_HAVE_LINK,
        additionalLinksToTheMaterial: 0,
        doYouHaveAnyEvidence: c.NO_EVIDENCE,
        doYouWantToUploadAnotherFile: 'NA',
        areYouWillingToBeContacted: c.GIVE_CONTACT,
        whatAreYourContactDetails: c.TENANTS_EMAIL,
      };
      break;
    case '16':
      applicant = {
        scenarioId: '16',
        description: "S15 - Don't have link - No evidence - Yes contact - Telephone contact",
        doYouHaveLinkToTheMaterial: c.DO_NOT_HAVE_LINK,
        additionalLinksToTheMaterial: 0,
        doYouHaveAnyEvidence: c.NO_EVIDENCE,
        doYouWantToUploadAnotherFile: 'NA',
        areYouWillingToBeContacted: c.GIVE_CONTACT,
        whatAreYourContactDetails: c.TELEPHONE_LABEL,
      };
      break;
    case '17':
      applicant = {
        scenarioId: '17',
        description: "S17 - Don't have link - No evidence - No contact",
        doYouHaveLinkToTheMaterial: c.DO_NOT_HAVE_LINK,
        additionalLinksToTheMaterial: 0,
        doYouHaveAnyEvidence: c.NO_EVIDENCE,
        doYouWantToUploadAnotherFile: 'NA',
        areYouWillingToBeContacted: c.DO_NOT_GIVE_CONTACT,
        whatAreYourContactDetails: 'NA',
      };
      break;
    default:
      throw new Error(`No ROTM applicant data found for scenario ID: ${scenarioId}`);
  }

  if (applicant.description !== description) {
    throw new Error(`ROTM scenario ${scenarioId} description mismatch. Expected "${applicant.description}" but received "${description}".`);
  }

  return applicant;
}