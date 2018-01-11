'use strict';

module.exports = superclass => class extends superclass {
  getBackLink(req, res) {
    let backLink = super.getBackLink(req, res);
    if (!backLink) {
      backLink = 'image';
    }
    return backLink;
  }
};
