'use strict';

require('hof-theme-govuk');
const repeater = require('./repeater');
const govuk = require('govuk-frontend');

govuk.initAll();

repeater.init();
