'use strict';

var util = require('util');

var Controller = require('../../../lib/base-controller');

var BoilerPlate = function BoilerPlate() {
  Controller.apply(this, arguments);
};

util.inherits(BoilerPlate, Controller);

BoilerPlate.prototype.getValues = function getValues(req, res) {
  this.options.clearSession = false;
  res.locals.backLink = '/confirmation';
  Controller.prototype.getValues.apply(this, arguments);
};

module.exports = BoilerPlate;
