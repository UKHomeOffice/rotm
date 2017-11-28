'use strict';

const _ = require('lodash');
const Model = require('../models/image-upload');
const ValidationError = require('hof-form-controller').ValidationError;

module.exports = superclass => class extends superclass {

  process(req) {
    if (req.files && req.files.image) {
      // set image name on values for filename extension validation
      // N:B validation controller gets values from
      // req.form.values and not on req.files
      req.form.values.image = _.pick(req.files.image, 'name');
    }
    super.process.apply(this, arguments);
  }

  saveValues(req, res, next) {
    if (req.files && req.files.image) {
      const model = new Model();
      const image = _.pick(req.files.image, ['name', 'data', 'mimetype']);
      model.set(image);
      return model.save()
        .then((result) => {
          req.log('debug', 'Image saved to S3');
          image['saved-url'] = result.url;
          req.form.values.image = image;
          super.saveValues(req, res, next);
        })
        .catch((err) => {
          req.log('debug', 'Image not saved to S3');
          next(new ValidationError('unsaved', err));
        });
    }
    super.saveValues.apply(this, arguments);
  }

};
