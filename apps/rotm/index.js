 'use strict';

const skipStep = require('./behaviours/skip-step');
const saveImage = require('./behaviours/save-image');
const createThumbnail = require('./behaviours/create-thumbnail');

module.exports = {
  name: 'rotm',
  params: '/:action?',
  confirmStep: '/check-your-report',
  steps: {
    '/source': {
      fields: [
        'source'
      ],
      next: '/more-info'
    },
    '/more-info': {
      fields: [
        'more-info'
      ],
      next: '/image'
    },
    '/image': {
      fields: [
        'image'
      ],
      behaviours: [skipStep, saveImage, createThumbnail],
      next: '/add-image'
    },
    '/add-image': {
      fields: [
        'add-image'
      ],
      forks: [{
        target: '/image',
        condition: {
          field: 'add-image',
          value: 'no'
        }
      }],
      next: '/check-your-report'
    },
    '/check-your-report': {
      prereqs: ['/image'],
      behaviours: [require('hof-behaviour-summary-page'), 'complete'],
      nullValue: 'pages.confirm.undefined',
      sections: {
        'summary': [
          'source',
          'more-info'
        ]
      },
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
