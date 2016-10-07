'use strict';

const bootstrap = require('hof-bootstrap');

bootstrap({
  translations: './apps/rotm/translations',
  views: false,
  fields: false,
  routes: [
    require('./apps/rotm')
  ]
});
