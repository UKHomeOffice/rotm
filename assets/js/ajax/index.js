'use strict';

var XHR = function XHR(options) {
  /*eslint no-undef: 0*/
  var xhr = new XMLHttpRequest();
  xhr.onload = function onload() {
    options.complete(xhr);
  };

  try {
    xhr.open(options.method, options.uri, true);

    if (options.method === 'POST') {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }

    xhr.responseType = options.responseType;
    xhr.send(options.params);
  } catch (err) {
    // Probably IE's security settings (e.g. calling https from http page)
    throw new Error('Not supported');
  }
};

module.exports = XHR;
