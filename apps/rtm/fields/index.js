'use strict';

module.exports = {
  'continue': {
    value: 'buttons.continue'
  },
  'submit': {
    value: 'buttons.submit'
  },
  'change': {
    value: 'buttons.change'
  },
  'send': {
    value: 'buttons.send'
  },
  'url': {
    validate: ['required'],
    label: 'fields.url.label'
  },
  'location': {
    label: 'fields.location.label'
  },
  'description': {
    label: 'fields.description.label'
  },
  'anonymous': {
    validate: ['required'],
    className: ['inline', 'form-group'],
    legend: 'fields.anonymous.legend',
    options: [{
      value: 'yes',
      label: 'fields.anonymous.options.yes.label'
    }, {
      value: 'no',
      label: 'fields.anonymous.options.no.label',
      toggle: 'contact-info-group'
    }]
  },
  'contact-info-name': {
    label: 'fields.contact-info-name.label'
  },
  'contact-info-email': {
    validate: ['email'],
    label: 'fields.contact-info-email.label'
  },
  'contact-info-phone': {
    label: 'fields.contact-info-phone.label'
  },
  'remove-url': {
    'label': ''
  },
  'remove-index': {
    'label': ''
  }
};
