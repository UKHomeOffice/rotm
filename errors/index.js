'use strict';
var i18nFuture = require('i18n-future')();
var config = require('../config');
var logger = require('../lib/logger');

/*eslint no-unused-vars: 0*/
module.exports = function errorHandler(err, req, res) {
  /*eslint no-unused-vars: 1*/
  var content = {};

  if (err.code === 'SESSION_TIMEOUT') {
    content.title = i18nFuture.translate('errors.session.title');
    content.message = i18nFuture.translate('errors.session.message');
  }

  err.template = 'error';
  content.title = content.title || i18nFuture.translate('errors.default.title');
  content.message = content.message || i18nFuture.translate('errors.default.message');

  res.statusCode = err.status || 500;

  logger.error(err.message || err.error, err);

  res.render(err.template, {
    error: err,
    content: content,
    backLink: false,
    showStack: config.env === 'development',
    startLink: req.path.replace(/^\/([^\/]*).*$/, '$1')
  });
};
