'use strict';

var util = require('util');

var BaseController = require('./add-report');

var AdditionalReportController = function AdditionalReportController() {
  BaseController.apply(this, arguments);
};

util.inherits(AdditionalReportController, BaseController);

AdditionalReportController.prototype.locals = function locals() {
  var lcls = BaseController.prototype.locals.apply(this, arguments);
  lcls['additional-report'] = true;
  return lcls;
};

module.exports = AdditionalReportController;
