'use strict';

var util = require('util');

var Controller = require('../../../lib/base-controller');

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
  if (reportToRemove) {
    locals.values = {'report': reportToRemove};
  }
  return locals;
};


/*eslint no-unused-vars: 0*/
Remove.prototype.saveValues = function saveValues(req, res, callback) {
  var array = req.sessionModel.get('report') || [];
  var id = req.params.action;
  var index = req.form.values['remove-index'];
  var reports = req.sessionModel.get('report');
  reportToRemove = reports[id];

  if (id === index && typeof id !== undefined && typeof reportToRemove !== undefined) {
    array.splice(id, 1);
    req.sessionModel.set('report', array);
    req.sessionModel.unset('errorValues');
  }
  callback();
};

module.exports = Remove;
