const { reCaptcha } = require('../../../config');
const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');

/**
  * Create an assessment to analyze the risk of a UI action.
  *
  * projectID: Your Google Cloud Project ID.
  * recaptchaSiteKey: The reCAPTCHA key associated with the site/app
  * token: The generated token obtained from the client.
  * recaptchaAction: Action name corresponding to the token.
  */
async function createAssessment({
  // TODO: Replace the token and reCAPTCHA action variables before running the sample.
  projectID = reCaptcha.projectID,
  recaptchaKey = reCaptcha.siteKeyV3,
  token,
  recaptchaAction = 'submit'
} = {}, req) {
  // Create the reCAPTCHA client.
  // TODO: Cache the client generation code (recommended) or call client.close() before exiting the method.
  const client = new RecaptchaEnterpriseServiceClient();
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

  const [ response ] = await client.createAssessment(request);

  // Check if the token is valid.
  if (!response.tokenProperties.valid) {
    req.log(
      'debug',
      `The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`
    );
    return null;
  }

  // Check if the expected action was executed.
  // The `action` property is set by user client in the grecaptcha.enterprise.execute() method.
  if (response.tokenProperties.action === recaptchaAction) {
    // Get the risk score and the reason(s).
    // For more information on interpreting the assessment, see:
    // https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
    req.log('debug', `The reCAPTCHA score is: ${response.riskAnalysis.score}`);
    response.riskAnalysis.reasons.forEach( reason => {
      req.log('debug', reason);
    });

    return response.riskAnalysis.score;
  }

  req.log('debug', 'The action attribute in your reCAPTCHA tag does not match the action you are expecting to score');
  return null;
}

module.exports = superclass => class extends superclass {
  async validate(req, res, next) {
    // const validationErrorFunc = (key, type) =>
    //   new this.ValidationError(key, { type: type});

    try {
      const token = req.body['g-recaptcha-token'];
      const score = await createAssessment({ token }, req);
      req.log('info', `Risk Analysis -> Score: ${score}`);
    } catch (error) {
      req.log('error', `Verification failed: ${error.message}`);
    }

    // @TODO:
    //    Currently allowing users to continue regardless of the reCAPTCHA score.
    //    In the future, implement a restriction to prevent users from continuing if the score exceeds the threshold.
    //
    //   const errs = {
    //     token: validationErrorFunc('token', 'verificationFailed'),
    //   };

    //  return next(errs);

    return next();
  }
};
