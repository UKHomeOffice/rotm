'use strict';

module.exports = {
  '/': {
    template: 'rtm/terrorism-reporting',
    controller: require('../../controllers/add-report'),
    fields: [
      'url',
      'location',
      'description'
    ],
    next: '/confirmation'
  },
  '/confirmation': {
    template: 'rtm/confirm',
    controller: require('../../controllers/rtm/confirm'),
    fields: [
      'anonymous',
      'contant-info-name',
      'contant-info-email',
      'contant-info-phone'
    ],
    backLink: '/',
    next: '/done'
  },
  '/done': {
    template: 'rtm/complete',
    backLink: null
  }
};
