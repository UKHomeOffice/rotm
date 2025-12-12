'use strict';

/* global grecaptcha */

require('hof/frontend/themes/gov-uk/client-js');
const repeater = require('./repeater');
const govuk = require('govuk-frontend');
const reCaptchaSiteKeyV3 = window.reCaptchaSiteKeyV3;

govuk.initAll();

repeater.init();

function onSubmit(e) {
  e.preventDefault();
  grecaptcha.enterprise.ready(async () => {
    const token = await grecaptcha.enterprise.execute(reCaptchaSiteKeyV3, {action: 'submit'});

    // Populate hidden field with token
    const form = e.target.closest('form');
    const hiddenField = form.querySelector('input[name="g-recaptcha-token"]');
    if (hiddenField) {
      hiddenField.value = token;
    } else {
      const newHiddenField = document.createElement('input');
      newHiddenField.type = 'hidden';
      newHiddenField.name = 'g-recaptcha-token';
      newHiddenField.value = token;
      form.appendChild(newHiddenField);
    }

    form.submit();
  });
}

// Bind onSubmit function to each input submit button
document.querySelectorAll('input[type="submit"]').forEach(button => {
  button.addEventListener('click', onSubmit);
});
