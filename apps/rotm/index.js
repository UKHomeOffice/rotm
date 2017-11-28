 'use strict';

const skipStep = require('./behaviours/skip-step');
const getImage = require('./behaviours/get-image');
const saveImage = require('./behaviours/save-image');

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
      behaviours: [skipStep, saveImage],
      next: '/add-image'
    },
    '/add-image': {
      fields: [
        'add-image'
      ],
      behaviours: [getImage],
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
