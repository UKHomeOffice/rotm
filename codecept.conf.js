'use strict';
/* eslint no-process-env: 0 */
/* eslint implicit-dependencies/no-implicit: [2, { dev: true }] */
module.exports = require('so-acceptance').extend({
  name: 'rotm',
  tests: './apps/*/acceptance/features/**/*.js',
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
