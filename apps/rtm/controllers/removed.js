'use strict';

var util = require('util');

var Controller = require('../../../lib/base-controller');

var ItemRemoved = function ItemRemoved() {
  Controller.apply(this, arguments);
};

util.inherits(ItemRemoved, Controller);

var _next = '/confirmation';

ItemRemoved.prototype.getNextStep = function getNextStep (req){
  var next = Controller.prototype.getNextStep.apply(this, arguments);
  console.log(next);
  var sessionData = req.sessionModel.get('report') || [];
  if (sessionData.length < 1){
    next = '/report-terrorism';
  }
  console.log(next);
  return next;
};

module.exports = ItemRemoved;
