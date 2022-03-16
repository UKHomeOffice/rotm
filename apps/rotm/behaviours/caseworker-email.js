'use strict';

const Emailer = require('hof').components.emailer;
const path = require('path');
const moment = require('moment');
const config = require('../../../config');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;
const submissionDateTime = moment().format(config.dateTimeFormat);
const logger = createLogger({
  level: 'info',
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

  logger.log({
    level: 'info',
    message: `Session ID: ${model.sessionId}, Submission ID: ${model.submissionID}, Email Submitted: ${submissionDateTime}`
  });

  return {
    urls: model.urls,
    images: model.images,
    table: [
      { label: getLabel('uniqueId'), value: model.submissionID },
      { label: getLabel('submitted'), value: submissionDateTime },
      ...fields.map(f => ({
        label: getLabel(f),
        value: model[f]
      }))
    ]
  };
};

module.exports = settings => {
  if (settings.transport !== 'stub' && !settings.from && !settings.replyTo) {
    // eslint-disable-next-line no-console
    console.warn('WARNING: Email `from` address must be provided. Falling back to stub email transport.');
  }
  return Emailer(Object.assign({}, settings, {
    transport: settings.from ? settings.transport : 'stub',
    recipient: settings.caseworker,
    subject: (model, translate) => translate('email.caseworker.subject'),
    template: path.resolve(__dirname, '../emails/caseworker.html'),
    parse
  }));
};
