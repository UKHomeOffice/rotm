'use strict';

var util = require('util');
var _ = require('underscore');

var Controller = require('../../../lib/base-controller');
var Model = require('../../common/models/email');

var Submit = function Submit() {
  Controller.apply(this, arguments);
};

util.inherits(Submit, Controller);

function getReports(req) {
  var sessionData = _.pick(req.sessionModel.toJSON(), _.identity);
  var data = sessionData.report;
  return data;
}

Submit.prototype.getValues = function getValues(req) {
  var data = getReports(req);
  _.each(data, function addIndex(d, i) {

    var options = {
      'id': i,
      'uri': 'editurl'
    };
    var defaults = {};

    d.options = options;

    d['data-options'] = JSON.stringify(options);
    d['data-defaults'] = JSON.stringify(defaults);
    d['report-number'] = i + 1;
  });
  Controller.prototype.getValues.apply(this, arguments);
};

Submit.prototype.locals = function locals(req) {
  var lcls = Controller.prototype.locals.apply(this, arguments);
  var reportCount = getReports(req).length;
  lcls['single-report'] = reportCount === 1;
  lcls['multiple-reports'] = reportCount > 1;
  return lcls;
};

Submit.prototype.saveValues = function saveValues(req, res, callback) {
  var data = getReports(req);
  if (data && data.length) {
    data.forEach(function sendEachReport(d) {
      var model = new Model(d);
      var service = {
        template: 'rtm',
        subject: 'Form submitted: Reporting Terrorist Materials'
      };

      if (service) {
        model.set('template', service.template);
        model.set('subject', service.subject);
      } else {
        throw new Error('no service found');
      }

      model.save(callback);

    });

  }
};

module.exports = Submit;
