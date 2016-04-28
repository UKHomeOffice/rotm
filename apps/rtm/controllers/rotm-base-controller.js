'use strict';

const _ = require('lodash');
const BaseController = require('hof').controllers.base;

module.exports = class Controller extends BaseController {

  constructor(options) {
    super(options);
  }

  getReports(req) {
    const sessionData = _.pickBy(req.sessionModel.toJSON(), _.identity);
    let data = sessionData.report || [];
    return data;
  }

};
