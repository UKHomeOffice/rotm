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
  }
};
