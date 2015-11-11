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
  '/editurl': {
    template: 'confirm-edit.html',
    controller: require('./controllers/edit'),
    fields: [
      'url',
      'location',
      'description',
      'edit-index'
    ],
    backLink: '/',
    next: '/confirm-edit'
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
  '/confirm-edit': {
    template: 'edited.html',
    backLink: '/',
    fields: [
      'continue'
    ],
    next: '/confirmation'
  },
  '/done': {
    template: 'complete.html',
    backLink: null
  },
  '/data': {
    controller: require('./controllers/update-session'),
    next: null
  }
};
