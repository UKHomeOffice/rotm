'use strict';

var util = require('util');

var BaseController = require('./add-to-session-controller');

var AddReport = function AddReport() {
  [].unshift.call(arguments, 'report');
  BaseController.apply(this, arguments);
};

util.inherits(AddReport, BaseController);

module.exports = AddReport;
