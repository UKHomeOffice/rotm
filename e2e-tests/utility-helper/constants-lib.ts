export class ConstantsLib {
  private constructor() {}

  static readonly FULL_NAME = 'HOF TEST';
  static readonly TELEPHONE = '01616699548';
  static readonly EMAIL_LABEL = 'Email';
  static readonly TELEPHONE_LABEL = 'Telephone';
  static readonly BOTH_CONTACTS = 'Both';
  static readonly RESPONSE_YES = 'Yes';
  static readonly RESPONSE_NO = 'No';
  static readonly HAVE_LINK = 'Yes, I have a link to the material';
  static readonly DO_NOT_HAVE_LINK = 'No, I don’t have a link';
  static readonly LINK_TO_MATERIAL = 'www.gov.uk/page/1234/content';
  static readonly HAVE_EVIDENCE = 'Yes, I have evidence';
  static readonly NO_EVIDENCE = 'No, I don’t have anything';
  static readonly GIVE_CONTACT = 'Yes, I’ll give my contact details';
  static readonly DO_NOT_GIVE_CONTACT = 'No, I don’t want to be contacted';
  static readonly ADDITIONAL_DETAILS = 'Anything else you want to tell us';
  static readonly SAS_HOF_EMAIL = requiredEnv('SAS_HOF_EMAIL');
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}
