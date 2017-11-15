'use strict';

const path = require('path');

const pagesPath = filename => path.resolve(__dirname,
  `./apps/rotm/acceptance/pages/${filename}`);

// eslint-disable-next-line implicit-dependencies/no-implicit
module.exports = require('so-acceptance').extend({
  name: 'rotm',
  tests: './apps/*/acceptance/features/**/*.js',
  include: {
    reportPage: pagesPath('report.js'),
    contactConsentPage: pagesPath('contact-consent.js'),
    contactDetailsPage: pagesPath('contact-details.js'),
    confirmPage: pagesPath('confirm.js'),
    confirmationPage: pagesPath('confirmation.js')
  }
});
