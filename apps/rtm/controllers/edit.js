'use strict';

var util = require('util');
var _ = require('underscore');

var Controller = require('../../../lib/ajax-edit-controller');

var Edit = function Remove() {
  Controller.apply(this, arguments);
};

util.inherits(Edit, Controller);

var reportToEdit;

/*eslint no-unused-vars: 0*/
Edit.prototype.getValues = function getValues(req, res, callback) {
  if (req.params.action) {
    var id = req.params.action;
    var reports = req.sessionModel.get('report') || [];
    if (typeof reports[id] === 'object') {
      reportToEdit = reports[id];
    }
  }
  Controller.prototype.getValues.apply(this, arguments);
};

Edit.prototype.locals = function EditLocals(req, res) {
  var locals = Controller.prototype.locals.apply(this, arguments);
  if (reportToEdit) {
    return _.extend({}, locals, {
      'values': {
        'url': reportToEdit.url,
        'location': reportToEdit.location,
        'description': reportToEdit.description,
        'index': reportToEdit.index
      }
    });
  }

  return locals;
};


/*eslint no-unused-vars: 0*/
Edit.prototype.saveValues = function saveValues(req, res, callback) {

  var id = req.params.action;
  if (typeof id === undefined) {
    throw new Error('The required report id is missing');
  }

  var reports = req.sessionModel.get('report');
  reportToEdit = reports[id];
  if (typeof reportToEdit === undefined) {
    throw new Error('The required report id is missing');
  }

  _.extend(reportToEdit, req.form.values);

  req.sessionModel.set('report', reports);
  req.sessionModel.unset('errorValues');

  callback();
};

module.exports = Edit;
