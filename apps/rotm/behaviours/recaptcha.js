const { reCaptcha } = require('../../../config');
const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');
const client = new RecaptchaEnterpriseServiceClient();

/**
 * Create an assessment to analyse the risk of a UI action.
 *
 * @param {Object} options - The options for the assessment.
 * @param {string} options.projectID - Google Cloud Project ID.
 * @param {string} options.recaptchaKey - The reCAPTCHA key associated with the site/app.
 * @param {string} options.token - The generated token obtained from the client.
 * @param {string} [options.recaptchaAction='submit'] - Action name corresponding to the token.
 * @param {Object} req - The HTTP request object.
 * @returns {Promise<number|null>} - Resolves to the risk score (0 to 1) if successful,
 *                                   or `null` if the token is invalid or the action mismatches.
 *                                   Throws an error if the assessment request fails.
 */
async function createAssessment({
  projectID = reCaptcha.projectID,
  recaptchaKey,
  token,
  recaptchaAction
} = {}, req) {
  const projectPath = client.projectPath(projectID);

  // Build the assessment request.
  const request = ({
    assessment: {
      event: {
        token: token,
        siteKey: recaptchaKey
      }
    },
    parent: projectPath
  });

  try{
    const [ response ] = await client.createAssessment(request);

    // Check if the token is valid.
    if (!response?.tokenProperties?.valid) {
      const reason = response?.tokenProperties?.invalidReason || 'unknown reason';
      const errorMessage = `CreateAssessment failed: token issue - ${reason}`;
      req.log('debug', errorMessage);
      return null;
    }

    // Check if the expected action was executed only if the `action` property
    // is set by user client in the grecaptcha.enterprise.execute() method.
    if (recaptchaAction && response?.tokenProperties?.action !== recaptchaAction) {
      const errorMessage = 'The action attribute in reCAPTCHA tag does not match the action you are expecting to score';
      req.log('debug', errorMessage);
      return null;
    }

    // Get the risk score and the reason(s).
    // For more information on interpreting the assessment, see:
    // https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
    req.log('debug', `reCAPTCHA score is: ${response.riskAnalysis.score}`);
    response?.riskAnalysis?.reasons.forEach((reason, index) => {
      req.log('debug', `reCAPTCHA score reason ${index + 1}: ${reason}`);
    });

    return response.riskAnalysis.score;
  } catch (error) {
    const errorMessage = `Error during reCAPTCHA assessment: ${error.message}`;
    throw new Error(errorMessage);
  }
}

module.exports = superclass => class extends superclass {
  async validate(req, res, next) {
    const handleValidationError = reason => {
      req.log('debug', `reCAPTCHA Validation failed: ${reason}`);

      if (reCaptcha.threshold === 0) {
        req.log('debug', 'Threshold is 0. Accepting all scores, including null.');
        req.sessionModel.unset('reCaptchaRenderCheckbox');
        return next();
      }

      // Only perform reCAPTCHA validation if the user is on the confirm page.
      // This ensures that reCAPTCHA checks are enforced only at the final step of the form submission process.
      const { route: currentRoute, confirmStep } = req.form.options;
      if (currentRoute !== confirmStep) {
        return next();
      }

      return res.redirect(confirmStep);
    };

    try {
      const token = req.body['g-recaptcha-token'];
      const tokenCheckbox = req.body['g-recaptcha-token-checkbox'];
      if (!token && !tokenCheckbox) {
        const errorMessage = 'Missing reCAPTCHA token in the request body';
        throw new Error(errorMessage);
      }

      let score;

      if (tokenCheckbox) {
        score = await createAssessment({
          recaptchaKey: reCaptcha.siteKeyCheckbox,
          token: tokenCheckbox,
          recaptchaAction: 'send_report'
        }, req);
      } else {
        score = await createAssessment({
          recaptchaKey: reCaptcha.siteKeyScore,
          token: token,
          recaptchaAction: 'submit'
        }, req);
      }

      req.sessionModel.set('reCAPTCHAScore', score);

      if (score === null) {
        const errorMessage = 'reCAPTCHA score unavailable';
        throw new Error(errorMessage);
      }

      req.log('info', `reCAPTCHA Risk Analysis -> Score: ${score}`);

      if ( !(score >= reCaptcha.threshold) ) {
        req.sessionModel.set('reCaptchaRenderCheckbox', true);
        const errorMessage = 'Score does not meet the threshold';
        throw new Error(errorMessage);
      }
    } catch (error) {
      handleValidationError(error.message);
    }

    return next();
  }
};
