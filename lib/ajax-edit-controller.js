'use strict';

var util = require('util');
var _ = require('underscore');

var Parent = require('./ajax-controller');

var AjaxEditController = function AjaxEditController() {
  Parent.apply(this, arguments);
};

util.inherits(AjaxEditController, Parent);

AjaxEditController.prototype.process = function process(req, res, callback) {
  // Don't try to process missing fields
  req.form.values = _.pick(req.form.values, _.keys(req.body));
  callback();
};

module.exports = AjaxEditController;
