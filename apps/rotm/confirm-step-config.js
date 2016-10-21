'use strict';

module.exports = {
  modifiers: {
    'contact-consent': function displayLabel(value, req) {
      return req.translate(`fields.contact-consent.options.${value}.label`);
    }
  },
  tableSections: [{
    name: 'report',
    fields: [
      'where',
      'url',
      'description'
    ]
  }, {
    name: 'contact-details',
    fields: [
      'contact-consent',
      'name',
      'contact-type',
      'email-address',
      'phone-number',
      'phone-number-2'
    ]
  }]
};
