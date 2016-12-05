'use strict';

let I;

module.exports = {

  _init() {
   I = require('so-acceptance/steps.js')();
 },

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
    invalidPhoneNumbers: [
      'invalid phone',
      '+44 (020) 98347347898!',
      '+44 (020) 98347347898abc'
    ],
    validPhoneNumbers: [
      '+44 020 98347347898',
      '+44 (020) 8934783749',
      '+44-20-98174793489'
    ],
    validEmail: 'sterling@archer.com'
  },

  enterName() {
    I.fillField(this.id.name, this.content.name);
  },

  checkEmail() {
    I.checkOption(this.id.emailOption);
  },

  checkPhone() {
    I.checkOption(this.id.phoneOption);
  },

  checkText() {
    I.checkOption(this.id.textOption);
  }
};
