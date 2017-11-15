'use strict';

const path = require('path');

const pagesPath = filename => path.resolve(__dirname,
  `./apps/rotm/acceptance_tests/pages/${filename}`);

// eslint-disable-next-line implicit-dependencies/no-implicit
module.exports = require('so-acceptance').extend({
  name: 'rotm',
  tests: './apps/*/acceptance_tests/features/**/*.js',
  include: {
    reportPage: pagesPath('report.js'),
    contactConsentPage: pagesPath('contact-consent.js'),
    contactDetailsPage: pagesPath('contact-details.js'),
    confirmPage: pagesPath('confirm.js'),
    confirmationPage: pagesPath('confirmation.js')
  }
});
