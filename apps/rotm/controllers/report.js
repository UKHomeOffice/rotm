'use strict';

const controllers = require('hof-controllers');
const BaseController = controllers.base;
const ErrorController = controllers.error;

module.exports = class ReportController extends BaseController {
  locals(req, res, next) {
    const locals = super.locals(req, res, next);
    return Object.assign({}, locals, {
      items: req.translate('fields.description.items')
    });
  }

  validateField(key, req) {
    if (key === 'description') {
      if (!req.form.values.url && !req.form.values[key]) {
        return new ErrorController(key, {
          key,
          type: 'required'
        });
      }
    }
    return super.validateField(key, req);
  }
};
