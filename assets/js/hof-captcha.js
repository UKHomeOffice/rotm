/* global grecaptcha */

const reCaptchaSiteKeyScore = window.reCaptchaSiteKeyScore;
const reCaptchaSiteKeyCheckbox = window.reCaptchaSiteKeyCheckbox;

/**
 * Handles the status of the captcha.
 *
 * @param {string} status - The current status of the reCaptchaCheckbox ('ready', 'error').
 * @param {string} [errorType] - The type of error (if applicable).
 * @param {object} options - Additional options, including the captcha component.
 */
const captchaStatusHandler = (status, errorType, options) => {
  const { captchaComponent } = options;

  const captchaErrorMsg = captchaComponent.querySelectorAll('.govuk-error-message');

  switch (status) {
    case 'ready':
      if (captchaComponent) {
        captchaComponent.classList.remove('govuk-form-group--error');
      }
      if (captchaErrorMsg) {
        captchaErrorMsg.forEach(element => {
          element.classList.add('govuk-!-display-none');
        });
      }
      break;
    case 'error':
      if (captchaComponent) {
        captchaComponent.classList.add('govuk-form-group--error');
        document.getElementById(`captcha-error-${errorType}`).classList.remove('govuk-!-display-none');
      }
      break;
    default:
      break;
  }
};

/**
 * Generates a SCORE token (v3).
 *
 * @param {string} action - The action associated with the token.
 * @returns {Promise<string>} - The generated token.
 */
const generateCaptchaScoreToken = action => {
  return new Promise((resolve, reject) => {
    grecaptcha.enterprise.ready(async () => {
      try {
        const token = await grecaptcha.enterprise.execute(reCaptchaSiteKeyScore, { action });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  });
};

/**
 * Renders the reCAPTCHA v2 (CHECKBOX) widget.
 *
 * @param {HTMLElement} container - The container for the reCAPTCHA widget.
 * @param {HTMLInputElement} tokenInput - The hidden input to store the token.
 */
const renderRecaptchaV2 = (container, tokenInput) => {
  const action = container.getAttribute('data-action');

  grecaptcha.enterprise.render(container, {
    sitekey: reCaptchaSiteKeyCheckbox,
    ...(action && { action }),
    callback: token => {
      // Populate the hidden field with the CHECKBOX token
      if (tokenInput) {
        tokenInput.value = token;
      }
    },
    'expired-callback': () => {
      if (tokenInput) {
        tokenInput.value = '';
      }
    }
  });

  const tokenInputObserver = new MutationObserver(() => {
    captchaStatusHandler('ready', null, {
      captchaComponent: document.getElementById('hofCaptcha')
    });
  });

  // Observe changes to the `value` attribute of the hidden input
  tokenInputObserver.observe(tokenInput, { attributes: true, attributeFilter: ['value'] });
};

const init = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const reCaptchaCheckboxContainer = document.getElementById('recaptcha-checkbox-container');
    const reCaptchaCheckboxToken = document.getElementById('g-recaptcha-token-checkbox');
    if (reCaptchaCheckboxContainer && reCaptchaCheckboxToken) {
      grecaptcha.enterprise.ready(() => {
        renderRecaptchaV2(reCaptchaCheckboxContainer, reCaptchaCheckboxToken);
      });
    }

    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', async e => {
        e.preventDefault();

        try {
          // Generate SCORE token
          const scoreToken = await generateCaptchaScoreToken('submit');

          // Populate hidden field with token
          const reCaptchaToken = form.querySelector('input[name="g-recaptcha-token"]');
          if (reCaptchaToken) {
            reCaptchaToken.value = scoreToken;
          } else {
            const newreCaptchaToken = document.createElement('input');
            newreCaptchaToken.type = 'hidden';
            newreCaptchaToken.name = 'g-recaptcha-token';
            newreCaptchaToken.value = scoreToken;
            form.appendChild(newreCaptchaToken);
          }

          if (reCaptchaCheckboxContainer && !reCaptchaCheckboxToken.value) {
            captchaStatusHandler('error', 'reCaptchaRequired', {
              captchaComponent: document.getElementById('hofCaptcha')
            });
            throw new Error('reCaptchaRequired');
          }
          form.submit();
        } catch (error) {
          console.warn('Error handling reCAPTCHA:', error);
        }
      });
    }
  });
};

module.exports = {
  init
};
