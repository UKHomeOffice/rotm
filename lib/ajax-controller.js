'use strict';

var util = require('util');
var logger = require('./logger');
var express = require('express');
var _ = require('underscore');

var Parent = require('./base-controller');

var AjaxController = function AjaxController() {
  Parent.apply(this, arguments);
  this.router = express.Router({mergeParams: true});
  this.router.use(this.errorHandler.bind(this));
};

util.inherits(AjaxController, Parent);

var error = 'An error occurred';

AjaxController.prototype.isAjaxRequest = function isAjaxRequest(req) {
  return req.headers.accept === 'application/json';
};

/*eslint no-underscore-dangle: 0*/
/*eslint no-unused-vars: 0*/
AjaxController.prototype.post = function post(req, res, callback) {
  // Same as the standard method but with ajaxSaveValues in place of
  // saveValues
  this.setErrors(null, req, res);

  req.form = req.form || {};
  var router = express.Router({mergeParams: true});
  router.use([
    this._process.bind(this),
    this._validate.bind(this),
    this.ajaxSaveValues.bind(this),
    this.successHandler.bind(this)
  ]);
  /*eslint no-shadow: 0*/
  router.use(function f(err, req, res, next) {
    callback(err);
  });
  router.handle(req, res, callback);
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

AjaxController.prototype.ajaxSaveValues = function ajaxSaveValues(req, res, callback) {
  return this.isAjaxRequest(req) ?
    Parent.prototype.saveValues.call(this, req, res, callback) :
    this.saveValues(req, res, callback);
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
