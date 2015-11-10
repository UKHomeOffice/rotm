'use strict';

var util = require('util');
var logger = require('../../../lib/logger');
var express = require('express');

var Controller = require('../../../lib/base-controller');

var DataHandler = function Handler() {
  Controller.apply(this, arguments);
  this.router = express.Router({mergeParams: true});
  this.router.use(this.errorHandler.bind(this));
};

util.inherits(DataHandler, Controller);

var httpCode = 400;
var status = 'failure';
var msg = 'An error occurred';
var resp = {};

DataHandler.prototype.render = function render(req, res) {
  res.status(httpCode).send(
    {
      'status': status,
      'message': msg
    }
  );
};

DataHandler.prototype.successHandler = function successHandler(req, res) {
  httpCode = 200;
  status = 'success';
  msg = resp;
  this.render(req, res);
};

DataHandler.prototype.errorHandler = function errorHandler(err, req, res) {
  logger.error(httpCode, msg);
  this.render(req, res);
};

DataHandler.prototype.getValues = function getValues() {
  msg = 'Only POST requests are accepted';
  /*eslint handle-callback-err: 0 */
  throw new Error(msg);
};

/* augment this method to act on AJAX post data */
DataHandler.prototype.saveValues = function saveValues(req, res) {
  logger.info(req.body);
  resp = req.body;
  this.successHandler(req, res);
};

module.exports = DataHandler;
