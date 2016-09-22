'use strict';

const _ = require('lodash');
const path = require('path');
const i18n = require('hof').i18n;
const BaseController = require('hof').controllers.base;

const Model = require('../models/email');

module.exports = class Submit extends BaseController {

  // eslint-disable-next-line consistent-return
  get(req, res, callback) {
    if (!req.sessionModel.get('reports').length) {
      return res.redirect('/reports');
    }
    super.get(req, res, callback);
  }

  getValues(req, res, callback) {
    const reports = req.sessionModel.get('reports') || [];
    callback(null, {reports});
  }

  locals(req, res, callback) {
    const locals = super.locals(req, res, callback);
    let reports = req.sessionModel.get('reports');
    reports = reports.map(report => ({
      id: report.id,
      fields: _.map(_.omit(report, 'id'), (value, key) => ({key, value}))
    }));
    return Object.assign({}, locals, {reports});
  }

  saveValues(req, res, callback) {
    const data = req.sessionModel.get('reports');

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
