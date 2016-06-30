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
      step: 'reports'
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
      step: 'confirm'
    }
  },
  '/confirmation': {
    clearSession: true,
    backLink: null,
    locals: {
      step: 'confirmation'
    }
  }
};
