'use strict';

var util = require('util');
var Controller = require('../../lib/base-controller');

var _controller = function CollectionDate() {
  Controller.apply(this, arguments);
};

util.inherits(_controller, Controller);

_controller.prototype.getValues = function getValues(req, res, callback) {   
  return Controller.prototype.getValues.apply(this, arguments);
};

module.exports = _controller;
