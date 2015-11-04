'use strict';

module.exports = {
  '/': {
    template: 'report-terrorism.html',
    controller: require('./controllers/add-report'),
    fields: [
      'url',
      'location',
      'description'
    ],
    next: '/confirmation'
  },
  '/confirmation': {
    template: 'confirm.html',
    controller: require('./controllers/confirm'),
    fields: [
      'anonymous',
      'contact-info-name',
      'contact-info-email',
      'contact-info-phone'
    ],
    backLink: '/',
    next: '/done'
  },
  '/removeurl': {
    template: 'confirm-remove.html',
    controller: require('./controllers/remove'),
    fields: [
      'remove-url',
      'remove-index'
    ],
    backLink: '/',
    next: '/confirm-remove'
  },
  '/confirm-remove': {
    template: 'removed.html',
    controller: require('./controllers/removed.js'),
    backLink: '/',
    fields: [
      'continue'
    ],
    next: '/confirmation'
  },
  '/done': {
    template: 'complete.html',
    backLink: null
  }
};
