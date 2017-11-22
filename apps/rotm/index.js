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
      behaviours: skipStep,
      forks: [{
        target: '/check-your-report',
        condition: (req) => req.form.values['file-upload'] === ''
        }]
    },
    '/add-image': {
      next: '/check-your-report'
    },
    '/check-your-report': {
      behaviours: ['complete'],
      next: '/confirmation',
      backLink: 'image'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
