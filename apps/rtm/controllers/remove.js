'use strict';

const _ = require('lodash');

const Controller = require('../../common/controllers/ajax-edit');

let reportToRemove;

module.exports = class Remove extends Controller {
  constructor(options) {
    super(options);

  }

  getValues(req, res, callback) {
    if (req.params.action) {
      const id = req.params.action;
      const reports = req.sessionModel.get('report') || [];
      if (typeof reports[id] === 'object') {
        reportToRemove = reports[id];
      }
    }
    super.getValues(req, res, callback);
  }

  locals(req, res) {
    const lcls = super.locals(req, res);
    if (reportToRemove) {
      return _.extend({}, lcls, {
        'values': {
          'report': reportToRemove
        }
      });
    }

    return lcls;
  }

  saveValues(req, res, callback) {
    const id = req.params.action;
    const reports = req.sessionModel.get('report') || [];
    reportToRemove = reports[id];

    if (typeof id !== undefined && typeof reportToRemove !== undefined) {
      reports.splice(id, 1);
      req.sessionModel.set('report', reports);
      req.sessionModel.unset('errorValues');
    }
    callback();
  }

};
