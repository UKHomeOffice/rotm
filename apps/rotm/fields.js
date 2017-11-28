'use strict';

const path = require('path');

const extensions = ['.png', '.jpg', '.jpeg'];

module.exports = {
  source: {
    validate: 'required'
  },
  'more-info': {
    mixin: 'textarea'
  },
  'add-image': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no'
    ]
  },
  'image': {
    mixin: 'input-file',
    validate: [function extname(value) {
      return extensions.includes(path.extname(value.name));
    }]
  }
};
