'use strict';

const BaseController = require('hof').controllers.base;

module.exports = class ReportController extends BaseController {
  locals(req, res, next) {
    const locals = super.locals(req, res, next);
    return Object.assign({}, locals, {
      items: req.translate('fields.description.items')
    });
  }
};
