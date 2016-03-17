'use strict';

var hof = require('hof');
var wizard = hof.wizard;
var mixins = hof.mixins;
var i18nFuture = require('i18n-future');
var router = require('express').Router();
var path = require('path');
var _ = require('underscore');
var jasonBaker = require('jason-baker');

var fields = _.extend({}, require('../common/fields/'), require('./fields/'));
var translationSrc = [
  path.resolve(__dirname, './translations/src/**/*.json'),
  path.resolve(__dirname, '../common/translations/src/**/*.json')
];

jasonBaker(translationSrc, {saltStars: true}, function setupRoute(err, translations) {

  if (err) {
    throw err;
  }

  var i18n = i18nFuture({
    resources: translations
  });

  router.use(mixins(fields, {
    translate: i18n.translate.bind(i18n)
  }));

  router.use('/report-terrorism/', wizard(require('./steps'), fields, {
    controller: require('so-forms').controllers.base,
    templatePath: path.resolve(__dirname, 'views'),
    translate: i18n.translate.bind(i18n),
    params: '/:action?'
  }));

});

module.exports = router;
