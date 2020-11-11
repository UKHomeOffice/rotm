'use strict';

module.exports = name => superclass => class extends superclass {

  locals(req, res, next) {
    if (!Object.keys(req.form.errors).length && req.form.values[name] !== 'no') {
      req.form.values[name] = null;
    }
    return super.locals(req, res, next);
  }

};
