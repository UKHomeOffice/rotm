'use strict';

module.exports = superclass => class extends superclass {
  getValues(req, res, callback) {
    super.getValues(req, res, (err, values) => {
      let completedSteps = values.steps;
      const currentStep = req.form.options.route;
      if (completedSteps.includes(currentStep) === false) {
        completedSteps.push(currentStep);
        req.sessionModel.set('steps', completedSteps);
      }
      callback(err);
    });
  }
};
