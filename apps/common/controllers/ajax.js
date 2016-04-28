'use strict';

var logger = require('../../../lib/logger');
var _ = require('underscore');

const Controller = require('hof').controllers.base;

module.exports = class AjaxController extends Controller {
  constructor(options) {
    super(options);
    this.error = 'An error occurred';
  }

  isAjaxRequest(req) {
    return req.headers.accept === 'application/json';
  }

  process(req, res, callback) {
    if (this.isAjaxRequest(req)) {
      // Don't try to process missing fields
      req.form.values = _.pick(req.form.values, _.keys(req.body));
      callback();
    } else {
      return super.process(req, res, callback);
    }
  }

  successHandler(req, res, callback) {
    if (this.isAjaxRequest(req)) {
      this.error = false;
      this.render(req, res);
    } else {
      return super.successHandler(req, res, callback);
    }
  }

  errorHandler(err, req, res, callback) {
    if (this.isAjaxRequest(req)) {
      this.error = err.message;
      logger.info(400, this.error);
      this.render(req, res);
    } else {
      return super.errorHandler(err, req, res, callback);
    }
  }

  render(req, res, callback) {
    if (this.isAjaxRequest(req)) {
      if (this.error) {
        res.status(400).send(
          {
            'success': false,
            'error': this.error
          }
        );
      } else {
        res.status(200).send(res.locals.values);
      }
    } else {
      return super.render(req, res, callback);
    }
  }
};
