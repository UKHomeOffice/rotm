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
    invalidPhone: 'invalid phone',
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
