 'use strict';

const skipStep = require('./behaviours/skip-step');
const saveImage = require('./behaviours/save-image');
const deleteImage = require('./behaviours/delete-image');
const createThumbnail = require('./behaviours/create-thumbnail');
const config = require('../../config');
const caseworkerEmailer = require('./behaviours/caseworker-email')(config.email);
const checkReportBackLink = require('./behaviours/check-report-back-link');

module.exports = {
  name: 'rotm',
  params: '/:action?',
  confirmStep: '/check-your-report',
  steps: {
    '/source': {
      fields: [
        'source'
      ],
      next: '/more-info'
    },
    '/more-info': {
      fields: [
        'more-info'
      ],
      next: '/image'
    },
    '/image': {
      fields: [
        'image'
      ],
      behaviours: [skipStep, saveImage, createThumbnail],
      next: '/add-image',
      continueOnEdit: true
    },
    '/add-image': {
      behaviours: deleteImage,
      fields: [
        'add-image'
      ],
      forks: [{
        target: '/image',
        condition: {
          field: 'add-image',
          value: 'no'
        }
      }],
      next: '/check-your-report',
      continueOnEdit: true
    },
    '/check-your-report': {
      prereqs: ['/image'],
      behaviours: [require('hof-behaviour-summary-page'), 'complete', caseworkerEmailer, checkReportBackLink],
      nullValue: 'pages.confirm.undefined',
      sections: {
        'summary': [
          'source',
          'more-info'
          // image preview is hardcoded in the page template
        ]
      },
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
