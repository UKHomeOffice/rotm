'use strict';

module.exports = superclass => class extends superclass {

  saveValues(req, res, next) {
    super.saveValues(req, res, (err) => {
      if (req.form.values['add-image'] === 'no') {
        req.sessionModel.unset('image');
        req.sessionModel.unset('image-preview');
        req.sessionModel.unset('image-url');
      }
      next(err);
    });
  }
};
