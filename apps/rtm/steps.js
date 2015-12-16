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
    backLink: '/confirmation',
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
    backLink: '/confirmation',
    next: '/confirm-edit'
  },
  '/confirm-remove': {
    template: 'removed.html',
    controller: require('./controllers/removed'),
    backLink: '/confirmation',
    fields: [
      'continue'
    ],
    next: '/confirmation'
  },
  '/confirm-edit': {
    template: 'edited.html',
    backLink: '/confirmation',
    fields: [
      'continue'
    ],
    next: '/confirmation'
  },
  '/reset': {
    template: '../../common/views/reset.html',
    controller: require('./controllers/reset'),
    backLink: '/confirmation',
    next: '/confirmation'
  },
  '/cookies': {
    controller: require('./controllers/boilerplate'),
    template: 'cookies.html',
    backLink: '/'
  },
  '/terms-and-conditions': {
    controller: require('./controllers/boilerplate'),
    template: 'terms.html',
    backLink: '/'
  },
  '/done': {
    template: 'complete.html',
    controller: require('./controllers/done'),
    backLink: null
  }
};
