'use strict';

const Controller = require('so-forms').controllers.base;

module.exports = class ItemRemoved extends Controller {

  constructor(options) {
    super(options);
  }

  getNextStep(req) {
    let next = super.getNextStep(req);
    const sessionData = req.sessionModel.get('report') || [];
    if (sessionData.length < 1) {
      next = req.baseUrl;
    }
    return next;
  }

};
