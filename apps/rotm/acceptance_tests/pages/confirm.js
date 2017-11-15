'use strict';

const confirmData = {
  where: 'On a website',
  url: 'http://www.gov.uk',
  description: 'I found it on the home page',
  name: 'Sterling Archer',
  'contact-type': 'Email',
  'email-address': 'sterling@archer.com'
};

module.exports = {
  url: 'confirm',

  confirmData: confirmData,

  data: {
    where: confirmData.where,
    url: confirmData.url,
    description: confirmData.description,
    'contact-consent': 'true',
    name: confirmData.name,
    'contact-type': 'email',
    'email-address': confirmData['email-address']
  }
};
