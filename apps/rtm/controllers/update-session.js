'use strict';

var util = require('util');
var logger = require('../../../lib/logger');

var Controller = require('./data');

var UpdateSessionController = function SessionController() {
  logger.info('blah');
  Controller.apply(this, arguments);
};

util.inherits(UpdateSessionController, Controller);

/*eslint no-unused-vars: 0*/
UpdateSessionController.prototype.saveValues = function saveValues(req, res, callback) {

  var reportId = req.body['edit-index'];
  if (!(reportId || reportId === 0)) {
    logger.info('throwing');
    throw new Error('Can\'t edit a report without a report id');
  }

  var reports = req.sessionModel.get('report');
  if (!reports) {
    throw new Error('No report data to edit.');
  }

  var reportToEdit = reports[reportId];
  if (!reportToEdit) {
    throw new Error('No report matches the report id provided.');
  }

  var paramToEdit = req.body.paramName;
  if (!paramToEdit) {
    throw new Error('Cannot edit report as no parameter was provided.');
  }

  var newParamValue = req.body.paramValue;
  if (!newParamValue && newParamValue !== '') {
    throw new Error('Cannot edit report as no value was provided.');
  }

  // permit the updating of fields that didn't exist before
  // if (!report.hasOwnProperty(paramToEdit)){ throw new Error('Parameter doesn't exist'); }

  reportToEdit[paramToEdit] = newParamValue;
  req.sessionModel.set('report', reports);
  Controller.prototype.saveValues.apply(this, arguments);
};

module.exports = UpdateSessionController;
