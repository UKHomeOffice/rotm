'use strict';

const bootstrap = require('hof-bootstrap');

bootstrap({
  translations: './apps/rotm/translations',
  views: false,
  fields: false,
  routes: [
    require('./apps/rotm')
  ],
  middleware: [(req, res, next) => {
    /* eslint-disable no-console */
    console.log('HEADERS>>>', req.headers);
    next();
    /* eslint-enable no-console */
  }]
});
