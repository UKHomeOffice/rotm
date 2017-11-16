 'use strict';

const controllers = require('hof-controllers');

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
        section: 'report-section'
      }
    },
    '/contact-consent': {
      fields: [
        'contact-consent'
      ],
      next: '/contact-details',
      forks: [{
        target: '/confirm',
        condition: {
          field: 'contact-consent',
          value: 'false'
        }
      }],
      locals: {
        section: 'contact-section'
      }
    },
    '/contact-details': {
      behaviours: [require('./behaviours/filter-fields')],
      fields: [
        'name',
        'contact-type',
        'email-address',
        'phone-number',
        'phone-number-2'
      ],
      next: '/confirm',
      locals: {
        section: 'contact-details',
        privacy: 'https://www.gov.uk/help/privacy-policy'
      }
    },
    '/confirm': {
      controller: controllers.confirm,
      fieldsConfig: require('./fields'),
      emailConfig: require('../../config').email,
      next: '/confirmation',
      emailUser: false,
      locals: {
        section: 'confirm'
      }
    },
    '/confirmation': {
      clearSession: true,
      locals: {
        section: 'confirmation'
      }
    }
  }
};
