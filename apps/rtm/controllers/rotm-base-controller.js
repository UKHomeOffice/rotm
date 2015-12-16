'use strict';

var util = require('util');
var _ = require('underscore');
var BaseController = require('../../../lib/base-controller');

var Controller = function Controller() {
  BaseController.apply(this, arguments);
};

util.inherits(Controller, BaseController);

Controller.prototype.getReports = function getReports(req) {
  var sessionData = _.pick(req.sessionModel.toJSON(), _.identity);
  var data = sessionData.report || [];
  return data;
};

module.exports = Controller;
