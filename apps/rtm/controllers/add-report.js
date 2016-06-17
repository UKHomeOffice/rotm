'use strict';

const Controller = require('hof').controllers.base;

module.exports = class AddReportController extends Controller {

  constructor(options) {
    super(options);
  }

  locals(req) {
    var lcls = super.locals(req);
    var reports = req.sessionModel.get('report') || [];
    if (reports.length) {
      lcls['additional-report'] = true;
    }
    return lcls;
  }

  saveValues(req, res, callback) {
    var array = req.sessionModel.get('report') || [];
    var data = req.form.values;
    array.push(data);
    super.getNextStep(req, res);
    req.sessionModel.set('report', array);
    req.sessionModel.unset('errorValues');
    callback();
  }
};
