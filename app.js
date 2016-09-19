'use strict';

const bootstrap = require('hof-bootstrap');
const path = require('path');

bootstrap({
  views: path.resolve(__dirname, './apps/common/views'),
  fields: false,
  routes: [
    require('./apps/rotm')
  ]
});
