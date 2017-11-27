'use strict';

const _ = require('lodash');

module.exports = (config) => {

  return superclass => class extends superclass {

    getValues(req, res, callback) {
      super.getValues(req, res, (err, values) => {
        if (config && config.steps) {
          const skipSteps = [].concat(config.steps);
          let completedSteps = values.steps;
          const currentStep = req.path;

          if (skipSteps.includes(currentStep) === false) {
            skipSteps.unshift(currentStep);
          }
          if (_.intersection(skipSteps, completedSteps).length === 0) {
            const newSteps = completedSteps.concat(skipSteps);
            req.sessionModel.set('steps', newSteps);
          }
        } else {
          // eslint-disable-next-line no-console
          console.warn('Warning: no steps provided behaviour will not skip');
        }
        callback(err);
      });
    }
  };
};
