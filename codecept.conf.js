'use strict';

const path = require('path');

const pagesPath = filename => path.resolve(__dirname,
  `./apps/rotm/acceptance/pages/${filename}`);

module.exports = require('so-acceptance').extend({
  name: 'rotm',
  features: './apps/*/acceptance/features/**/*.js',
  include: {
    reportPage: pagesPath('report.js'),
    contactConsentPage: pagesPath('contact-consent.js'),
    contactDetailsPage: pagesPath('contact-details.js'),
    confirmPage: pagesPath('confirm.js'),
    confirmationPage: pagesPath('confirmation.js')
  },
  helpers: {
    WebDriverIO: {
      host: 'localhost',
      port: 4444,
      path: '/wd/hub',
      url: process.env.TEST_URL || 'http://localhost:8080',
      browser: 'chrome',
      desiredCapabilities: {
        chromeOptions: { args: ['headless', 'disable-gpu'] }
      }
    }
  }
});
