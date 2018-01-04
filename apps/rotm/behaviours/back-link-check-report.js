'use strict';

module.exports = superclass => class extends superclass {
  getBackLink(req, res, callback) {
    let backLink = super.getBackLink(req, res, callback);
      if (!backLink) {
        backLink = 'image';
      }
    return backLink;
  }
};
