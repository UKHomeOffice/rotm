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
  csp: config.csp,
  getCookies: false,
  getTerms: false
});

const app = hof(settings);

// Terms & Cookies added to have visibility on accessibility statement
// in the footer. Once HOF has updated with that we can remove these
// including the getTerms: false, getCookies: false config and common directory
app.use('/terms-and-conditions', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('terms'));
  next();
});

app.use('/cookies', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('cookies'));
  next();
});

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
  // Below can be removed once generic accessibility footer link is added to HOF
  res.locals.footerSupportLinks = [
    { path: '/cookies', property: 'base.cookies' },
    { path: '/terms-and-conditions', property: 'base.terms' },
    { path: '/accessibility', property: 'base.accessibility' }
  ];
  next();
});

app.use(bodyParser({limit: config.upload.maxFileSize}));

module.exports = app;
