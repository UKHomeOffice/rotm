'use strict';

const Controller = require('so-forms').controllers.ajax_edit;

module.exports = class Reset extends Controller {

  constructor(options) {
    super(options);
  }

  saveValues(req, res, callback) {
    req.sessionModel.reset();
    callback();
  }

  getNextStep(req) {
    let next = req.baseUrl;
    return next;
  }

};
