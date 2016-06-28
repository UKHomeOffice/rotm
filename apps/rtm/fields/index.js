'use strict';

module.exports = {
  'url': {
    mixin: 'input-text',
    validate: ['required'],
  },
  'location': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens']
  },
  'description': {
    mixin: 'textarea',
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens']
  },
  'anonymous': {
    validate: ['required'],
    className: ['inline', 'form-group'],
    options: [{
      value: 'yes',
      label: 'fields.anonymous.options.yes.label'
    }, {
      value: 'no',
      label: 'fields.anonymous.options.no.label',
      toggle: 'contact-info-group'
    }]
  },
  'contact-info-email': {
    validate: ['email']
  }
};
