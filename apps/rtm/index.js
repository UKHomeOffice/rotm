'use strict';

const hof = require('hof');
const wizard = hof.wizard;
const mixins = hof.mixins;
const i18nFuture = hof.i18n;
const BaseController = hof.controllers.base;
const deepTranslate = hof.middleware.deepTranslate;
const router = require('express').Router();
const path = require('path');
const _ = require('lodash');

const fields = _.cloneDeep(require('./fields/'));
const i18n = i18nFuture({
  path: path.resolve(__dirname, './translations/__lng__/__ns__.json')
});

router.use(deepTranslate({
  translate: i18n.translate.bind(i18n)
}));

router.use(mixins(fields));

router.use('/', wizard(require('./steps'), fields, {
  controller: BaseController,
  templatePath: path.resolve(__dirname, 'views'),
  params: '/:action?/:id?'
}));

module.exports = router;
