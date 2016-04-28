'use strict';

const _ = require('underscore');
const Controller = require('../../common/controllers/ajax-edit');
let reportToEdit;

module.exports = class Edit extends Controller {
  constructor(options) {
    super(options);
  }

  getValues(req, res, callback) {
    if (req.params.action) {
      const id = req.params.action;
      const reports = req.sessionModel.get('report') || [];
      if (typeof reports[id] === 'object') {
        reportToEdit = reports[id];
      }
    }
    super.getValues(req, res, callback);
  }

  locals(req, res) {
    const locals = super.locals(req, res);
    if (reportToEdit) {
      return _.extend({}, locals, {
        'values': {
          'url': reportToEdit.url,
          'location': reportToEdit.location,
          'description': reportToEdit.description,
          'index': reportToEdit.index
        }
      });
    }

    return locals;
  }

  saveValues(req, res, callback) {

    const id = req.params.action;
    if (typeof id === undefined) {
      throw new Error('The required report id is missing');
    }

    const reports = req.sessionModel.get('report');
    reportToEdit = reports[id];
    if (typeof reportToEdit === undefined) {
      throw new Error('The required report id is missing');
    }

    _.extend(reportToEdit, req.form.values);

    req.sessionModel.set('report', reports);
    req.sessionModel.unset('errorValues');

    callback();
  }

};
