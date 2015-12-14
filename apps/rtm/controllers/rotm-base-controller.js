'use strict';

var util = require('util');
var _ = require('underscore');
var BaseController = require('../../../lib/base-controller');
var path = require('path');


var Controller = function Controller() {
  BaseController.apply(this, arguments);
};

util.inherits(Controller, BaseController);

Controller.prototype.getReports = function getReports(req) {
  var sessionData = _.pick(req.sessionModel.toJSON(), _.identity);
  var data = sessionData.report;
  return data;
};

Controller.prototype.missingPrereqHandler = function missingPrereqHandler(req, res) {
  var last = _.last(req.sessionModel.get('steps'));
  var redirect = _.first(Object.keys(this.options.steps));

    if (last && this.options.steps[last]) {
        redirect = this.options.steps[last].next || last;
    }
    res.redirect(path.join(res.locals.siteroot + req.baseUrl, redirect));
};

module.exports = Controller;
