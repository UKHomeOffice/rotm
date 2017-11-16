 'use strict';

module.exports = {
  name: 'rotm',
  params: '/:action?',
  steps: {
    '/report': {
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
