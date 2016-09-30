'use strict';

const _ = require('lodash');
const Controller = require('hof').controllers.base;
const uuid = require('node-uuid');

module.exports = class AddReportController extends Controller {

  get(req, res, callback) {
    switch (req.params.action) {
      case 'delete':
        return this.delete(req, res, callback);
      case 'new':
      default:
        return super.get(req, res, callback);
    }
  }

  delete(req, res, callback) {
    if (req.params.action === 'delete' && req.params.id !== undefined) {
      const reports = req.sessionModel.get('reports') || [];
      const report = _.find(reports, {id: req.params.id});
      const index = _.indexOf(reports, report);
      reports.splice(index, 1);
      req.sessionModel.set({reports});
    }
    res.redirect(this.getNextStep(req, res, callback));
  }

  getValues(req, res, callback) {
    super.getValues(req, res, (err, values) => {
      if (err) {
        return callback(err);
      }
      if (req.params.action === 'edit' && req.params.id !== undefined) {
        const reports = req.sessionModel.get('reports');
        const report = _.find(reports, {id: req.params.id});
        values = Object.assign({}, report, values);
      }
      return callback(null, values);
    });
  }

  locals(req, res) {
    const locals = super.locals(req, res);
    const reports = req.sessionModel.get('reports') || [];
    return Object.assign({}, locals, {
      'additional-report': !!reports.length,
      editing: req.params.action === 'edit'
    });
  }

  saveValues(req, res, callback) {
    const editing = req.params.action === 'edit' && req.params.id !== undefined;
    const reports = req.sessionModel.get('reports') || [];
    const data = req.form.values;
    if (editing) {
      const id = req.params.id;
      const report = _.find(reports, {id});
      const index = _.indexOf(reports, report);
      reports.splice(index, 1, Object.assign({}, report, data));
    } else {
      reports.push(Object.assign({}, data, {
        id: uuid.v4()
      }));
    }
    req.sessionModel.set({reports});
    req.sessionModel.unset('errorValues');
    callback();
  }
};
