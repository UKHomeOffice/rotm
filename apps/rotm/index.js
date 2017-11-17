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
      next: '/confirm'
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
