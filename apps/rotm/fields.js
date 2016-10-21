'use strict';

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
    formatter: ['trim', 'hyphens'],
    child: `<div class="form-hint">
              {{> partials-bullet-list}}
            </div>`
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
