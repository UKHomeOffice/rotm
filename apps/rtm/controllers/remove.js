'use strict';

var util = require('util');

var Controller = require('../../../lib/base-controller');

var Remove = function Remove() {
  Controller.apply(this, arguments);
};

util.inherits(Remove, Controller);

Remove.prototype.saveValues = function saveValues(req, res, callback) {
  var array = req.sessionModel.get('report') || [];
  array = array;
  callback();
};

module.exports = Remove;
