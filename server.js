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
  getCookies: false,
  redis: config.redis,
  csp: config.csp
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
  // Set feedback and footer links
  res.locals.feedbackUrl = '/feedback';
  res.locals.footerSupportLinks = [
    { path: '/cookies', property: 'base.cookies' },
    { path: '/terms-and-conditions', property: 'base.terms' },
    { path: '/accessibility', property: 'base.accessibility' }
  ];
  // set service name for cookie banner
  res.locals.serviceName = 'Report Online Terrorist Material';
  next();
});

app.use('/cookies', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('cookies'));
  next();
});

app.use(bodyParser({limit: config.upload.maxFileSize}));

module.exports = app;
