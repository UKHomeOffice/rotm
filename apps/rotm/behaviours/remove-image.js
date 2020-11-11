'use strict';

module.exports = superclass => class extends superclass {

  configure(req, res, next) {
    if (req.query.delete) {
      const images = req.sessionModel.get('images') || [];
      const remaining = images.filter(i => i.id !== req.query.delete);
      req.sessionModel.set('images', remaining);
      return res.redirect(req.path);
    }
    return super.configure(req, res, next);
  }

};
