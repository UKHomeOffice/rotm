'use strict';

var util = require('util');

var Controller = require('../../../lib/base-controller');

var AddToSessionController = function AddReport(key) {
  this.key = key;
  [].shift.call(arguments);
  Controller.apply(this, arguments);
};

util.inherits(AddToSessionController, Controller);

AddToSessionController.prototype.saveValues = function saveValues(req, res, callback) {
  console.log(req.sessionModel.get(this.key));
  var array = req.sessionModel.get(this.key) || [];
  array.push(req.form.values);
  this.getNextStep(req);
  req.sessionModel.set(this.key, array);
  req.sessionModel.unset('errorValues');
  console.log(req.sessionModel.get(this.key));
  callback();
};

module.exports = AddToSessionController;
