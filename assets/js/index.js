'use strict';

require('hof-theme-govuk');

// accessibility- focus on the validation when it appears
document.getElementsByClassName('validation-summary')[0].focus();

document.getElementById('add-image-button').classList.remove('visuallyhidden');

document.getElementById('file-upload').tabIndex = -1;

document.getElementById('image-submit').tabIndex = -1;

document.getElementById('add-image-button').removeAttribute('tabindex');

document.getElementById('add-image-button').addEventListener('click', function imgClick() {
  document.getElementById('file-upload').click();
});

document.getElementById('file-upload').addEventListener('change', function fileUploadChangeEvent() {
  this.form.submit();
});
