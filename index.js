'use strict';

const hof = require('hof');
const config = require('./config');
const mockAPIs = require('./mock-apis');
const bodyParser = require('busboy-body-parser');

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

app.use(bodyParser({limit: config.upload.maxFileSize}));

module.exports = app;

