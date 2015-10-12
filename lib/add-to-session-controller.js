'use strict';

var util = require('util');

var Controller = require('../lib/base-controller');

var AddToSessionController = function AddReport(key) {
  this.key = key;

  [].shift.call(arguments);
  Controller.apply(this, arguments);
};

util.inherits(AddToSessionController, Controller);

AddToSessionController.prototype.saveValues = function saveValues(req, res, callback) {
  var array = req.sessionModel.get(this.key) || [];

  array.push(req.form.values);
  this.setNextPage(req);
  req.sessionModel.set(this.key, array);
  req.sessionModel.unset('errorValues');
  callback();
};

module.exports = AddToSessionController;
