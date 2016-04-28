'use strict';

const _ = require('underscore');
const Controller = require('./ajax');

module.exports = class AjaxEditController extends Controller {
  constructor(options) {
    super(options);
  }

  process(req, res, callback) {
    // Don't try to process missing fields
    req.form.values = _.pick(req.form.values, _.keys(req.body));
    callback();
  }

};
