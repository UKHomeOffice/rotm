'use strict';

var hof = require('hof');
var mixins = hof.mixins;
var i18nFuture = hof.i18n;
var router = require('express').Router();
var path = require('path');
var _ = require('underscore');

var fields = _.extend({}, require('../common/fields/'), require('./fields/'));
var i18n = i18nFuture({
  path: path.resolve(__dirname, './translations/__lng__/__ns__.json')
});

router.use(mixins(fields, {
  translate: i18n.translate.bind(i18n)
}));

router.use('/cookies', function renderCookies(req, res) {
  res.render('cookies');
});

router.use('/terms-and-conditions', function renderTerms(req, res) {
  res.render('terms');
});

module.exports = router;
