 'use strict';

const skipStep = require('./behaviours/skip-step');

module.exports = {
  name: 'rotm',
  params: '/:action?',
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
      next: '/add-image',
      behaviours: skipStep
    },
    '/add-image': {
      next: '/check-your-report'
    },
    '/check-your-report': {
      prereqs: ['/image'],
      behaviours: ['complete'],
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
