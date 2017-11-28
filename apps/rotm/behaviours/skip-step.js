'use strict';

module.exports = superclass => class Skippable extends superclass {
  get(req, res, next) {
    this.emit('complete', req, res);
    super.get(req, res, next);
  }
};
