'use strict';

const Emailer = require('hof').components.emailer;
const path = require('path');
const moment = require('moment');
const config = require('../../../config');
const submissionDateTime = moment().format(config.dateTimeFormat);

const parse = (model, translate) => {
  const getLabel = key => translate(`email.caseworker.fields.${key}.label`);
  const fields = [
    'evidence-written',
    'contact-details-name',
    'contact-email',
    'contact-phone'
  ];

  console.log('>>>>>>>>>>>>>>>>>>>', model);

  //model.log('info', `Submission ID: ${model.submissionID}, Submitted: ${submissionDateTime}`);

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
