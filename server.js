/* eslint no-process-env: 0 */
'use strict';

const hof = require('hof');
const config = require('./config');
const mockAPIs = require('./mock-apis');
const bodyParser = require('busboy-body-parser');

if (process.env.REDIS_URL) {
  config.redis = process.env.REDIS_URL;
}

let settings = require('./hof.settings');

settings = Object.assign({}, settings, {
  behaviours: settings.behaviours.map(require),
  routes: settings.routes.map(require),
  redis: config.redis,
  csp: {
    imgSrc: [
      'www.google-analytics.com',
      'ssl.gstatic.com',
      'www.google.co.uk/ads/ga-audiences'
    ],
    connectSrc: [
      'https://www.google-analytics.com',
      'https://region1.google-analytics.com',
      'https://region1.analytics.google.com',
      'https://www.google.com'
    ],
    frameSrc: [
      'https://www.google.com'
    ]
  },
  getAccessibility: false
});

const app = hof(settings);

app.use('/report', (req, res) => {
  res.redirect(301, '/');
});

if (config.useMocks) {
  app.use(mockAPIs);
}

app.use((req, res, next) => {
  // Set HTML Language
  res.locals.htmlLang = 'en';

  // Set feedback url, required to display phase banner
  res.locals.feedbackUrl = config.feedbackUrl;

  // Pass reCAPTCHA site key to templates
  res.locals.reCaptchaSiteKeyV3 = config.reCaptcha.siteKeyV3;

  next();
});

app.use(bodyParser({limit: config.upload.maxFileSize}));

module.exports = app;
