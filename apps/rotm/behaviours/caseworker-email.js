'use strict';

const Emailer = require('hof-behaviour-emailer');
const path = require('path');
const moment = require('moment');
const config = require('../../../config');


const getDataRows = (model, translate) => {
  const getLabel = key => translate(`email.caseworker.fields.${key}.label`);
  return [
      {
        table: [
          { label: getLabel('submitted'), value: moment().format(config.dateTimeFormat) },
          { label: getLabel('source'), value: model.source },
          { label: getLabel('more-info'), value: model['more-info'] }
        ]
      }
    ];
};

module.exports = settings => {
  if (settings.transport !== 'stub' && !settings.from && !settings.replyTo) {
    // eslint-disable-next-line no-console
    console.warn('WARNING: Email `from` address must be provided. Falling back to stub email transport.');
  }
  return Emailer(Object.assign({}, settings, {
    transport: settings.from ? settings.transport : 'stub',
    recipient: settings.caseworker,
    subject: (model, translate) => {
      translate('email.caseworker.subject');
    },
    template: path.resolve(__dirname, '../emails/caseworker.html'),
    parse: (model, translate) => Object.assign(model, { data: getDataRows(model, translate) })
  }));
};
