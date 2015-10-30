'use strict';

var util = require('util');
var _ = require('underscore');

var Controller = require('../../../lib/base-controller');
var Model = require('../../common/models/email');

var Submit = function Submit() {
  Controller.apply(this, arguments);
};

util.inherits(Submit, Controller);

Submit.prototype.saveValues = function saveValues(req, res, callback) {
  var sessionData = _.pick(req.sessionModel.toJSON(), _.identity);
  var data = sessionData.report;
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
