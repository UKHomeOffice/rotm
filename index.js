/* eslint no-process-env: 0 */
'use strict';

const hof = require('hof');
const config = require('./config');
const mockAPIs = require('./mock-apis');
const bodyParser = require('busboy-body-parser');
const fs = require('fs');

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

app.use('/report', (req, res) => {
  res.redirect(301, '/');
});

if (config.useMocks) {
  app.use(mockAPIs);
}

app.use((req, res, next) => {
  res.locals.htmlLang = 'en';
  res.locals.footerSupportLinks = [
    { path: '/cookies', property: 'base.cookies' },
    { path: '/terms-and-conditions', property: 'base.terms' },
    { path: '/accessibility', property: 'base.accessibility' },
  ];
  next();
});

fs.readFile('node_modules/hof-template-partials/translations/src/en/cookies.json', 'utf8', (e, data) => {
  const obj = JSON.parse(data);
  obj['session-cookies-table'].rows[0][0] = 'hod.sid';
  fs.writeFile('node_modules/hof-template-partials/translations/src/en/cookies.json',
    JSON.stringify(obj, null, 2), (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.err(err);
      }
    });
});

app.use(bodyParser({limit: config.upload.maxFileSize}));

module.exports = app;

