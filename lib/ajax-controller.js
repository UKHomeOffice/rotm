'use strict';

var util = require('util');
var logger = require('./logger');
var _ = require('underscore');

var Parent = require('./base-controller');

var AjaxController = function AjaxController() {
  Parent.apply(this, arguments);
};

util.inherits(AjaxController, Parent);

var error = 'An error occurred';

AjaxController.prototype.isAjaxRequest = function isAjaxRequest(req) {
  return req.headers.accept === 'application/json';
};

AjaxController.prototype.process = function process(req, res, callback) {
  if (this.isAjaxRequest(req)) {
    // Don't try to process missing fields
    req.form.values = _.pick(req.form.values, _.keys(req.body));
    callback();
  } else {
    return Parent.prototype.process.call(this, req, res, callback);
  }
};

AjaxController.prototype.successHandler = function successHandler(req, res, callback) {
  if (this.isAjaxRequest(req)) {
    error = false;
    this.render(req, res);
  } else {
    return Parent.prototype.successHandler.call(this, req, res, callback);
  }
};

AjaxController.prototype.errorHandler = function errorHandler(err, req, res, callback) {
  if (this.isAjaxRequest(req)) {
    error = err.message;
    logger.info(400, error);
    this.render(req, res);
  } else {
    return Parent.prototype.errorHandler.call(this, err, req, res, callback);
  }
};

AjaxController.prototype.render = function render(req, res, callback) {
  if (this.isAjaxRequest(req)) {
    if (error) {
      res.status(400).send(
        {
          'success': false,
          'error': error
        }
      );
    } else {
      res.status(200).send(res.locals.values);
    }
  } else {
    return Parent.prototype.render.call(this, req, res, callback);
  }
};

module.exports = AjaxController;
