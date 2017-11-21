'use strict';

require('hof-theme-govuk');

document.getElementById('add-image-button').classList.remove('visuallyhidden');

document.getElementById('add-image-button').addEventListener('click', function imgClick() {
  document.getElementById('file-upload').click();
});

document.getElementById('file-upload').addEventListener('change', function fileUploadClick() {
  this.form.submit();
});
