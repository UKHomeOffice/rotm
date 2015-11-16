'use strict';

var util = require('util');
var _ = require('underscore');

var Parent = require('./base-controller');

var EditController = function EditController() {
  Parent.apply(this, arguments);
};

util.inherits(EditController, Parent);

EditController.prototype.process = function process(req, res, callback) {
  // Don't try to process missing fields
  req.form.values = _.pick(req.form.values, _.keys(req.body));
  callback();
};

module.exports = EditController;
