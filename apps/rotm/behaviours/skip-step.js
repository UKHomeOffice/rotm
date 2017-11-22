'use strict';

module.exports = superclass => class extends superclass {
  getValues(req, res, callback) {
    let completedSteps = req.sessionModel.get('steps');
    const currentStep = req.form.options.route;
    if (completedSteps.includes(currentStep) === false) {
      completedSteps.push(currentStep);
      req.sessionModel.set('steps', completedSteps);
    }
    super.getValues(req, res, callback);
  }

  locals(req, res) {
    const locals = super.locals(req, res);
    return locals;
  }
};
