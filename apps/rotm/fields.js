'use strict';

const path = require('path');

function extname(value) {
  return value && [
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.tiff',
    '.mp4',
    '.mov',
    '.wmv',
    '.flv',
    '.avi',
    '.pdf',
    '.m4a',
    '.mp3',
    '.flac',
    '.mp4',
    '.wav',
    '.wma',
    '.aac'
  ].includes(path.extname(value).toLowerCase());
}

module.exports = {
  source: {
    validate: 'required'
  },
  'evidence-url': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'url',
      child: 'partials/url-repeater'
    },
    {
      value: 'no'
    }],
  },
  'url': {
    mixin: 'textarea',
    validate: 'required',
    disableRender: true,
    dependent: {
      field: 'evidence-url',
      value: 'yes'
    },
    attributes: [{
      attribute: 'rows',
      value: 1
    }]
  },
  'another-url-1': {
    mixin: 'textarea',
    className: 'another-url',
    disableRender: true,
    dependent: {
      field: 'evidence-url',
      value: 'yes'
    },
    attributes: [{
      attribute: 'rows',
      value: 1
    }]
  },
  'another-url-2': {
    mixin: 'textarea',
    className: 'another-url',
    disableRender: true,
    dependent: {
      field: 'evidence-url',
      value: 'yes'
    },
    attributes: [{
      attribute: 'rows',
      value: 1
    }]
  },
  'another-url-3': {
    mixin: 'textarea',
    className: 'another-url',
    disableRender: true,
    dependent: {
      field: 'evidence-url',
      value: 'yes'
    },
    attributes: [{
      attribute: 'rows',
      value: 1
    }]
  },
  'another-url-4': {
    mixin: 'textarea',
    className: 'another-url',
    disableRender: true,
    dependent: {
      field: 'evidence-url',
      value: 'yes'
    },
    attributes: [{
      attribute: 'rows',
      value: 1
    }]
  },
  'evidence-upload': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'image',
      child: 'input-file'
    }, {
      value: 'no'
    }]
  },
  'image': {
    mixin: 'input-file',
    disableRender: true,
    dependent: {
      field: 'evidence-upload',
      value: 'yes'
    },
    validate: [
      'required',
      extname
    ]
  },
  'evidence-upload-more': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'another-image',
      child: 'input-file'
    }, {
      value: 'no'
    }]
  },
  'another-image': {
    mixin: 'input-file',
    disableRender: true,
    dependent: {
      field: 'evidence-upload-more',
      value: 'yes'
    },
    validate: [
      'required',
      extname
    ]
  },
  'evidence-written': {
    mixin: 'textarea',
    attributes: [{
      attribute: 'rows',
      value: 8
    }]
  },
  'can-we-contact': {
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
  'contact-details-name': {
    mixin: 'input-text',
    legend: {
      className: 'visuallyhidden'
    },
    validate: 'required'
  },
  'contact-details-method': {
    mixin: 'checkbox-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'email',
      toggle: 'contact-email',
      child: 'input-text'
    }, {
      value: 'phone',
      toggle: 'contact-phone',
      child: 'input-text'
    }]
  },
  'contact-email': {
    disableRender: true,
    dependent: {
      field: 'contact-details-method',
      value: 'email'
    },
    validate: 'required'
  },
  'contact-phone': {
    disableRender: true,
    dependent: {
      field: 'contact-details-method',
      value: 'phone'
    },
    validate: 'required'
  }
};
