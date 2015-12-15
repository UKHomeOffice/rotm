'use strict';

var util = require('util');
var _ = require('underscore');
var path = require('path');
var uuid = require('node-uuid');
var i18n = require('hof').i18n;

var Controller = require('./rotm-base-controller');
var Model = require('../../common/models/email');

var Submit = function Submit() {
  Controller.apply(this, arguments);
};

util.inherits(Submit, Controller);

Submit.prototype.getValues = function getValues(req) {
  var data = this.getReports(req);

  if (!this.options.hasOwnProperty('originalTemplate')) {
    this.options.originalTemplate = this.options.template;
  }

  if (!data.length) {
    this.options.template = path.resolve(__dirname, '../../common/views/start-again.html');
  } else {
    this.options.template = this.options.originalTemplate;
  }

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
  var reportCount = this.getReports(req).length;
  lcls['single-report'] = reportCount === 1;
  lcls['multiple-reports'] = reportCount > 1;
  return lcls;
};

Submit.prototype.saveValues = function saveValues(req, res, callback) {
  var data = this.getReports(req);

  if (data && data.length) {

    var userData = req.form.values.anonymous === 'no' ? {
      'contact-details': true,
      name: req.form.values['contact-info-name'],
      email: req.form.values['contact-info-email'],
      phone: req.form.values['contact-info-phone']
    } : {};

    var locali18n = i18n({
      path: path.resolve(
        __dirname, '../translations/__lng__/__ns__.json'
      )
    });

    locali18n.on('ready', function prepareEmail() {

      data.forEach(function sendEachReport(d, i) {

        var reportNumber = i + 1;
        var subjectAppend = data.length ? ' - ' + reportNumber + ' of ' + data.length : '';

        d = _.extend(d, userData);

        var dateTime = new Date();
        d.reportDate = dateTime.toISOString();
        d.reportId = uuid.v4();
        d.subject = locali18n.translate('pages.rtm-email-table.information.subject') + subjectAppend;

        var model = new Model(d);
        var service = {
          template: 'rtm',
          subject: d.subject
        };

        if (service) {
          model.set('template', service.template);
          model.set('subject', service.subject);
        } else {
          throw new Error('no service found');
        }

        model.save(callback);

      });
    });

  }
};

module.exports = Submit;
