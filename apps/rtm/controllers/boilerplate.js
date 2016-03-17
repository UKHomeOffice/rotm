'use strict';

const Controller = require('./rotm-base-controller');

module.exports = class BoilerPlate extends Controller{

  constructor(options) {
    super(options);
  }

  getValues(req, res, next) {
    this.options.clearSession = false;
    res.locals.backLink = '/';
    if (this.getReports(req).length) {
      res.locals.backLink = '/confirmation';
    }
    super.getValues(req, res, next);
  }
};
