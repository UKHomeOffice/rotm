'use strict';

var util = require('util');
var BaseController = require('../../../lib/base-controller');

var DoneController = function DoneController() {
  BaseController.apply(this, arguments);
};

util.inherits(DoneController, BaseController);

DoneController.prototype.getValues = function getValues(req, res, callback) {
  var json = req.sessionModel.toJSON();
  delete json.errorValues;
  req.sessionModel.reset();
  callback(null, json);
};

module.exports = DoneController;
