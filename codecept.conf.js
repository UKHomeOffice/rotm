'use strict';

const path = require('path');

const pagesPath = filename => path.resolve(__dirname,
  `./apps/rotm/acceptance/pages/${filename}`);

module.exports = {
  name: 'rotm',
  features: './apps/*/acceptance/features/**/*.js',
  include: {
    reportPage: pagesPath('report.js'),
    contactConsentPage: pagesPath('contact-consent.js')
  }
};
