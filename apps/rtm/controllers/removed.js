'use strict';

var util = require('util');

var Controller = require('../../../lib/base-controller');

var ItemRemoved = function ItemRemoved() {
  Controller.apply(this, arguments);
};

util.inherits(ItemRemoved, Controller);

ItemRemoved.prototype.getNextStep = function getNextStep(req) {
  var next = Controller.prototype.getNextStep.apply(this, arguments);
  var sessionData = req.sessionModel.get('report') || [];
  if (sessionData.length < 1) {
    next = req.baseUrl;
  }
  return next;
};

module.exports = ItemRemoved;
