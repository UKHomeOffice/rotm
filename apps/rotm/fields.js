'use strict';

function phoneNumber(number) {
  return number.match(/^[\d-+ ()]+$/);
}

module.exports = {
  'where': {
    mixin: 'input-text',
    validate: 'required'
  },
  'url': {
    mixin: 'input-text',
    validate: 'url',
    child: 'partials/url-details'
  },
  'description': {
    mixin: 'textarea',
    'ignore-defaults': true,
    validate: 'required',
    formatter: ['trim', 'hyphens'],
    child: `<div class="form-hint">
              {{> partials-bullet-list}}
            </div>`
  },
  'contact-consent': {
    validate: 'required',
    legend: {
      className: 'form-label-bold'
    },
    mixin: 'radio-group',
    options: [
      'true',
      'false'
    ]
  },
  name: {
    mixin: 'input-text',
    validate: 'required'
  },
  'contact-type': {
    validate: 'required',
    legend: {
      className: 'form-label-bold'
    },
    mixin: 'radio-group',
    options: [{
      value: 'email',
      toggle: 'email-address',
      child: 'input-text'
    }, {
      value: 'phone',
      toggle: 'phone-number',
      child: 'input-text'
    }, {
      value: 'text-message',
      toggle: 'phone-number-2',
      child: 'input-text'
    }]
  },
  'email-address': {
    validate: ['required', 'email'],
    dependent: {
      field: 'contact-type',
      value: 'email'
    }
  },
  'phone-number': {
    validate: ['required', phoneNumber],
    dependent: {
      field: 'contact-type',
      value: 'phone'
    }
  },
  'phone-number-2': {
    validate: ['required', phoneNumber],
    dependent: {
      field: 'contact-type',
      value: 'text-message'
    }
  }
};
