'use strict';
/* eslint implicit-dependencies/no-implicit: [2, { dev: true }] */
module.exports = require('so-acceptance').extend({
  name: 'rotm',
  tests: './apps/*/acceptance/features/**/*.js'
});
