 'use strict';

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
      next: '/add-image'
    },
    '/add-image': {
      next: '/confirm'
    },
    '/check-your-report': {
      next: 'confirm',
      backLink: 'image'
    },
    '/confirm': {
      behaviours: ['complete'],
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
