'use strict';

var logger = require('../../lib/logger');
var nodemailer = require('nodemailer');
var config = require('../../config');
var i18nFuture = require('hof').i18n;
var Hogan = require('hogan.js');
var i18nLookup = require('i18n-lookup');
var fs = require('fs');
var path = require('path');

var customerHtmlTemplates = {
  rotm: fs.readFileSync(
    path.resolve(__dirname, './templates/customer/html/rtm.mus')).toString('utf8')
};

var customerPlainTextTemplates = {
  rotm: fs.readFileSync(
    path.resolve(__dirname, './templates/customer/plain/rtm.mus')).toString('utf8')
};

var caseworkerHtmlTemplates = {
  rotm: fs.readFileSync(
    path.resolve(__dirname, './templates/caseworker/html/rtm.mus')).toString('utf8')
};

var caseworkerPlainTextTemplates = {
  rotm: fs.readFileSync(
    path.resolve(__dirname, './templates/caseworker/plain/rtm.mus')).toString('utf8')
};

var transport = (config.email.host === '' && config.email.port === '') ?
  require('nodemailer-stub-transport') : require('nodemailer-smtp-transport');

var emailOptions = {
  host: config.email.host,
  port: config.email.port,
  ignoreTLS: config.email.ignoreTLS
};

if (config.email.auth.user && config.email.auth.pass) {
  emailOptions.auth = config.email.auth;
}

if (config.email.secure) {
  emailOptions.secure = config.email.secure;
}

function Emailer() {
  this.transporter = nodemailer.createTransport(transport(emailOptions));
}

Emailer.prototype.send = function send(email, callback) {
  var locali18n = i18nFuture({
    path: path.resolve(__dirname, '../../apps/rotm')
  });

  locali18n.on('ready', function locali18nLoaded() {
    var lookup = i18nLookup(locali18n.translate.bind(locali18n));
    var templateData = {
      data: email.dataToSend,
      t: function t() {
        return function lookupTranslation(translate) {
          // for translations inside our mustache templates
          return lookup(Hogan.compile(translate).render(email.dataToSend));
        };
      }
    };

    function sendCustomerEmail(err) {
      logger.info('Caseworker email sent Error: ', err);
      if (email.to) {
        logger.info('Emailing customer: ', email.subject);
        this.transporter.sendMail({
          from: config.email.from,
          to: email.to,
          subject: email.subject,
          text: Hogan.compile(customerPlainTextTemplates[email.template]).render(templateData),
          html: Hogan.compile(customerHtmlTemplates[email.template]).render(templateData),
          attachments: [
            {
              filename: 'govuk_logotype_email.png',
              path: path.resolve(__dirname, './images/govuk_logotype_email.png'),
              cid: 'govuk_logotype_email'
            },
            {
              filename: 'ho_crest_27px.png',
              path: path.resolve(__dirname, './images/ho_crest_27px.png'),
              cid: 'ho_crest_27px'
            },
            {
              filename: 'spacer.gif',
              path: path.resolve(__dirname, './images/spacer.gif'),
              cid: 'spacer_image'
            }
          ]
        }, callback);
      } else {
        callback();
      }
    }

    logger.info('Emailing caseworker: ', email.subject);
    this.transporter.sendMail({
      from: config.email.from,
      to: config.email.caseworker,
      subject: email.subject,
      text: Hogan.compile(caseworkerPlainTextTemplates[email.template]).render(templateData),
      html: Hogan.compile(caseworkerHtmlTemplates[email.template]).render(templateData),
      attachments: [
        {
          filename: 'govuk_logotype_email.png',
          path: path.resolve(__dirname, './images/govuk_logotype_email.png'),
          cid: 'govuk_logotype_email'
        },
        {
          filename: 'ho_crest_27px.png',
          path: path.resolve(__dirname, './images/ho_crest_27px.png'),
          cid: 'ho_crest_27px'
        },
        {
          filename: 'spacer.gif',
          path: path.resolve(__dirname, './images/spacer.gif'),
          cid: 'spacer_image'
        }
      ]
    }, sendCustomerEmail.bind(this));
  }.bind(this));
};

module.exports = new Emailer();
