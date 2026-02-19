'use strict';

require('hof/frontend/themes/gov-uk/client-js');
const repeater = require('./repeater');
const govuk = require('govuk-frontend');
const hofCaptcha = require('./hof-captcha');

govuk.initAll();

repeater.init();
hofCaptcha.init();
