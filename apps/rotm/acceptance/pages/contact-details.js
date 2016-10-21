'use strict';

module.exports = {
  url: 'contact-details',

  id: {
    name: '#name',
    contactType: '#contact-type-group',
    emailOption: '[value=email]',
    phoneOption: '[value=phone]',
    textOption: '[value=text-message]',
    email: '#email-address',
    phone: '#phone-number',
    phone2: '#phone-number-2'
  },

  content: {
    name: 'Sterling Archer',
    invalidEmail: 'sterlingarcher',
    invalidPhone: 'invalid phone',
    validEmail: 'sterling@archer.com'
  }
};
