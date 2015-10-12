'use strict';

var util = require('util');

var Controller = require('../lib/add-to-session-controller');

var AddReport = function AddReport() {
  [].unshift.call(arguments, 'report');
  Controller.apply(this, arguments);
};

util.inherits(AddReport, Controller);

module.exports = AddReport;
