'use strict';

var util = require('util');
var _ = require('underscore');
var logger = require('../../../lib/logger');

var Controller = require('../../../lib/ajax-edit-controller');

var Reset = function Reset() {
  Controller.apply(this, arguments);
};

util.inherits(Reset, Controller);

/*eslint no-unused-vars: 0*/
Reset.prototype.saveValues = function getValues(req, res, callback) {
  req.sessionModel.reset();
  callback();
};

Reset.prototype.getNextStep = function getNextStep(req, res) {
  var next = req.baseUrl;
  return next;
};

module.exports = Reset;
