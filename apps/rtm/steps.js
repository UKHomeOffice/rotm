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
    next: '/done'
  },
  '/removeurl': {
    template: 'confirm-remove.html',
    controller: require('./controllers/remove'),
    fields: [
      'remove-url',
      'remove-index'
    ],
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
    next: '/confirm-edit'
  },
  '/confirm-remove': {
    template: 'removed.html',
    controller: require('./controllers/removed'),
    fields: [
      'continue'
    ],
    backLink: null,
    next: '/confirmation'
  },
  '/confirm-edit': {
    template: 'edited.html',
    fields: [
      'continue'
    ],
    next: '/confirmation'
  },
  '/reset': {
    template: '../../common/views/reset.html',
    controller: require('../common/controllers/reset'),
    next: '/confirmation'
  },
  '/done': {
    template: 'complete.html',
    controller: require('./controllers/done'),
    backLink: null
  }
};
