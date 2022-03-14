'use strict';

const uuid = require('uuid').v4();

module.exports = superclass => class extends superclass {
  saveValues(req, res, next) {
    req.form.values.urls = [
      req.form.values.url,
      req.form.values['another-url-1'],
      req.form.values['another-url-2'],
      req.form.values['another-url-3'],
      req.form.values['another-url-4']
    ].filter(Boolean);
    req.form.values.submissionID = uuid;
    req.log('info', `>>>>>>>>>>>>>>>>>>>> Submission ID: ${uuid}, Saving Urls: ${req.form.values.urls}`);
    console.log('info', `>>>>>>>>>>>>>>>>>>>> Submission ID: ${uuid}, Saving Urls: ${req.form.values.urls}`);
    return super.saveValues(req, res, next);
  }

  getValues(req, res, next) {
    super.getValues(req, res, (err, values) => {
      const urls = req.sessionModel.get('urls') || [];
      values.url = urls[0] || '';
      values['another-url-1'] = urls[1] || '';
      values['another-url-2'] = urls[2] || '';
      values['another-url-3'] = urls[3] || '';
      values['another-url-4'] = urls[4] || '';
      next(err, values);
    });
  }
};
