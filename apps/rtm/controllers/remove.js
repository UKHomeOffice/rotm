'use strict';

var util = require('util');
var _ = require('underscore');

var Controller = require('../../../lib/ajax-controller');

var Remove = function Remove() {
  Controller.apply(this, arguments);
};

util.inherits(Remove, Controller);

var reportToRemove;

/*eslint no-unused-vars: 0*/
Remove.prototype.getValues = function getValues(req, res, callback) {
  if (req.params.action) {
    var id = req.params.action;
    var reports = req.sessionModel.get('report') || [];
    if (typeof reports[id] === 'object') {
      reportToRemove = reports[id];
    }
  }
  Controller.prototype.getValues.apply(this, arguments);
};

Remove.prototype.locals = function locals(req, res) {
  var lcls = Controller.prototype.locals.apply(this, arguments);
  if (reportToRemove) {
    return _.extend({}, lcls, {
      'values': {
        'report': reportToRemove
      }
    });
  }

  return lcls;
};


/*eslint no-unused-vars: 0*/
Remove.prototype.saveValues = function saveValues(req, res, callback) {
  var id = req.params.action;
  var reports = req.sessionModel.get('report') || [];
  reportToRemove = reports[id];

  if (typeof id !== undefined && typeof reportToRemove !== undefined) {
    reports.splice(id, 1);
    req.sessionModel.set('report', reports);
    req.sessionModel.unset('errorValues');
  }
  callback();
};

module.exports = Remove;
