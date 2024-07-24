'use strict';

const uuid = require('uuid');

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    req.form.values.urls = [
      req.form.values.url,
      req.form.values['another-url-1'],
      req.form.values['another-url-2'],
      req.form.values['another-url-3'],
      req.form.values['another-url-4']
    ].filter(Boolean);
    const submissionID = req.sessionModel.get('submissionID');
    const ip = req.sessionModel.get('ip');

    req.log('info', `Submission ID: ${submissionID}, Saving Urls: ${req.form.values.urls}, IP Address: ${ip}`);
    return super.saveValues(req, res, next);
  }

  getValues(req, res, next) {
    super.getValues(req, res, (err, values) => {
      const submissionID = req.sessionModel.get('submissionID') || uuid.v4();
      const ip = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress;
      // eslint-disable-next-line no-console
      console.log('ipaddress : ' + ip);
      req.sessionModel.set('ip', ip);
      req.sessionModel.set('submissionID', submissionID);
      const urls = req.sessionModel.get('urls') || [];
      req.log('info', `Submission ID: ${submissionID}, Saved Urls: ${urls}`);
      values.url = urls[0] || '';
      values['another-url-1'] = urls[1] || '';
      values['another-url-2'] = urls[2] || '';
      values['another-url-3'] = urls[3] || '';
      values['another-url-4'] = urls[4] || '';
      next(err, values);
    });
  }
};
