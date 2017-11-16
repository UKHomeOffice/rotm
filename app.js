'use strict';

const hof = require('hof');

hof({
  translations: './apps/rotm/translations',
  views: false,
  fields: false,
  routes: [
    require('./apps/rotm')
  ]
});
