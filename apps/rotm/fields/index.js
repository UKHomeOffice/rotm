'use strict';

module.exports = {
  'url': {
    mixin: 'input-text',
    validate: ['required', {
      type: 'regex',
      arguments: [
        /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      ]
    }],
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
    validate: 'required',
    className: 'form-group',
    options: [{
      value: 'yes',
      label: 'fields.anonymous.options.yes.label'
    }, {
      value: 'no',
      label: 'fields.anonymous.options.no.label',
      toggle: 'contact-info-group',
      child: 'partials/contact-details'
    }]
  },
  'contact-info-email': {
    validate: 'email'
  }
};
