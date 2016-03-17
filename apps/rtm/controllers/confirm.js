'use strict';

const _ = require('lodash');
const path = require('path');
const uuid = require('node-uuid');
const i18n = require('i18n-future');

const Controller = require('./rotm-base-controller');
const Model = require('../../common/models/email');

module.exports = class Submit extends Controller {
  constructor(options) {
    super(options);
  }

  getValues(req, res, callback) {
    const data = super.getReports(req);

    if (!this.options.hasOwnProperty('originalTemplate')) {
      this.options.originalTemplate = this.options.template;
    }

    if (!data.length) {
      this.options.template = path.resolve(__dirname, '../../common/views/start-again.html');
    } else {
      this.options.template = this.options.originalTemplate;
    }

    _.each(data, function addIndex(d, i) {

      const options = {
        'id': i,
        'uri': 'editurl'
      };
      const defaults = {};

      d.options = options;

      d['data-options'] = JSON.stringify(options);
      d['data-defaults'] = JSON.stringify(defaults);
      d['report-number'] = i + 1;
    });
    super.getValues(req, res, callback);
  }

  locals(req) {
    const lcls = super.locals(req);
    const reportCount = super.getReports(req).length;
    lcls['single-report'] = reportCount === 1;
    lcls['multiple-reports'] = reportCount > 1;
    return lcls;
  }

  saveValues(req, res, callback) {
    const data = super.getReports(req);

    if (data && data.length) {

      const userData = req.form.values.anonymous === 'no' ? {
        'contact-details': true,
        name: req.form.values['contact-info-name'],
        email: req.form.values['contact-info-email'],
        phone: req.form.values['contact-info-phone']
      } : {};

      const locali18n = i18n({
        path: path.resolve(
        )
      });

      locali18n.on('ready', function prepareEmail() {

        data.forEach(function sendEachReport(d, i) {

          const reportNumber = i + 1;
          const subjectAppend = data.length ? ' - ' + reportNumber + ' of ' + data.length : '';

          d = _.extend(d, userData);

          const dateTime = new Date();
          d.reportDate = dateTime.toISOString();
          d.reportId = uuid.v4();
          d.subject = locali18n.translate('pages.rtm-email-table.information.subject') + subjectAppend;

          const model = new Model(d);
          const service = {
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
  }
};
