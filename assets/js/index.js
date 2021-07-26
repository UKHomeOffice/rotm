'use strict';

require('hof/frontend/themes/gov-uk/client-js');
const repeater = require('./repeater');
const govuk = require('govuk-frontend');

govuk.initAll();

repeater.init();
