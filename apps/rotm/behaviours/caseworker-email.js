'use strict';

const hof = require('hof');
const Notify = hof.components.notify;
const path = require('path');
const moment = require('moment');
const config = require('../../../config');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;

const logger = createLogger({
  format: combine(timestamp(), json()),
  transports: [new transports.Console({level: 'info', handleExceptions: true})]
});

const parse = (model, translate) => {
  const getLabel = key => translate(`email.caseworker.fields.${key}.label`);
  const fields = [
    'evidence-written',
    'contact-details-name',
    'contact-email',
    'contact-phone'
  ];

  const submissionDateTime = moment().format(config.dateTimeFormat);

  logger.log({
    level: 'info',
    message: `Submission ID: ${model.submissionID}, Email Submitted: ${submissionDateTime}`
  });

  return {
    data: {
      title: 'You have a new report of online terrorist material',
      urls: model.urls,
      images: model.images,
      port: model.remote_port,
      ipAddress: model.ipaddress,
      timezone: new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1],
      table: [
        {label: getLabel('uniqueId'), value: model.submissionID},
        {label: getLabel('submitted'), value: submissionDateTime},
        ...fields.map(f => ({
          label: getLabel(f),
          value: model[f]
        }))
      ]
    }
  };
};

const getIPAddress = model => {
  return String(model.ipaddress);
};

module.exports = settings => {
  return Notify(Object.assign({}, settings, {
    recipient: settings.caseworker,
    subject: (model, translate) => translate('email.caseworker.subject'),
    template: path.resolve(__dirname, '../emails/caseworker.html'),
    parse,
    attachment: model => getIPAddress(model)
  }));
};
