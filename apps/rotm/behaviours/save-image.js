'use strict';

const _ = require('lodash');
const Model = require('../models/image-upload');
const config = require('../../../config');

module.exports = name => superclass => class extends superclass {

  async process(req, res, next) {
    const file = req.files[name];
    if (file && file.truncated) {
      const err = await new this.ValidationError('image', {
        type: 'filesize',
        arguments: [config.upload.maxfilesize]
      }, req, res);
      return next({
        'image': err
      });
    }
    // set image name on values for filename extension validation
    // N:B validation controller gets values from
    // req.form.values and not on req.files
    req.form.values[name] = req.files[name].name;
    await super.process.apply(this, arguments);
  }

  locals(req, res, next) {
    if (!Object.keys(req.form.errors).length) {
      req.form.values['evidence-upload'] = null;
    }
    return super.locals(req, res, next);
  }

  saveValues(req, res, next) {
    const images = req.sessionModel.get('images') || [];
    if (req.files && req.files[name]) {
      const image = _.pick(req.files[name], ['name', 'data', 'mimetype']);
      const model = new Model(image);
      return model.save()
        .then(() => {
          req.sessionModel.set('images', [...images, model.toJSON()]);
          return super.saveValues(req, res, next);
        })
        .catch(next);
    }
    return super.saveValues.apply(this, arguments);
  }
};
