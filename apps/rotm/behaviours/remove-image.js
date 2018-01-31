'use strict';

module.exports = superclass => class extends superclass {

  getValues(req, res, callback) {
    if (req.get('Referrer').includes('/image')) {
      req.sessionModel.unset('image');
      req.sessionModel.unset('image-preview');
      req.sessionModel.unset('image-url');
    }
    super.getValues(req, res, callback);
  }
};
