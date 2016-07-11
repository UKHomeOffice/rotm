 'use strict';

const controllers = require('hof').controllers;

module.exports = {
  '/': {
    controller: controllers.start,
    next: '/reports'
  },
  '/reports': {
    controller: require('./controllers/reports'),
    fields: [
      'url',
      'location',
      'description'
    ],
    next: '/confirm',
    locals: {
      section: 'reports'
    }
  },
  '/confirm': {
    controller: require('./controllers/confirm'),
    backLink: null,
    fields: [
      'anonymous',
      'contact-info-name',
      'contact-info-email',
      'contact-info-phone'
    ],
    next: '/confirmation',
    locals: {
      section: 'confirm'
    }
  },
  '/confirmation': {
    clearSession: true,
    backLink: null,
    locals: {
      section: 'confirmation'
    }
  }
};
