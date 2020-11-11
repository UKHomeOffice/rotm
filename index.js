/* eslint no-process-env: 0 */
'use strict';

const hof = require('hof');
const config = require('./config');
const mockAPIs = require('./mock-apis');
const bodyParser = require('busboy-body-parser');

if (process.env.REDIS_URL) {
  config.redis = process.env.REDIS_URL;
}

const options = {
  start: false,
  routes: [
    require('./apps/rotm')
  ],
  redis: config.redis,
  csp: config.csp
};

const app = hof(options);

if (config.useMocks) {
  app.use(mockAPIs);
}

app.use((req, res, next) => {
  res.locals.footerSupportLinks = [
    { path: '/cookies', property: 'base.cookies' },
    { path: '/terms-and-conditions', property: 'base.terms' },
    { path: '/accessibility', property: 'base.accessibility' },
  ];
  next();
});

app.use(bodyParser({limit: config.upload.maxFileSize}));

module.exports = app;

