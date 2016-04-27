'use strict';

var form = require('so-forms');
var wizard = form.wizard;
var mixins = form.mixins;
var i18nFuture = require('i18n-future');
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

router.use('/report-terrorism/', wizard(require('./steps'), fields, {
  controller: require('so-forms').controllers.base,
  templatePath: path.resolve(__dirname, 'views'),
  translate: i18n.translate.bind(i18n),
  params: '/:action?'
}));

module.exports = router;
