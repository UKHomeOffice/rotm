'use strict';

const hof = require('hof');

module.exports = hof({
  start: false,
  routes: [
    require('./apps/rotm')
  ]
});
