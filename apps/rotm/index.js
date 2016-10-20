 'use strict';

const controllers = require('hof').controllers;

module.exports = {
  name: 'rotm',
  params: '/:action?/:id?',
  steps: {
    '/': {
      controller: controllers.start,
      next: '/report'
    },
    '/report': {
      controller: require('./controllers/report'),
      fields: [
        'where',
        'url',
        'description'
      ],
      next: '/contact-consent',
      locals: {
        section: 'report'
      }
    },
    '/contact-consent': {}
  }
};
