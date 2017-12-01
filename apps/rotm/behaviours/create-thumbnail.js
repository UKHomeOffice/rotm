'use strict';

const jimp = require('jimp');

module.exports = superclass => class extends superclass {

  process(req, res, next) {
    req.sessionModel.unset('image-preview');
    super.process(req, res, next);
  }

  saveValues(req, res, next) {
    super.saveValues(req, res, err => {
      if (err) {
        return next(err);
      }
      if (req.files.image && req.files.image.data) {
        jimp.read(req.files.image.data)
          .then(image => {
            image.resize(200, jimp.AUTO);
            return new Promise((resolve, reject) => {
              image.getBase64(req.files.image.mimetype, (e, data) => {
                return e ? reject(e) : resolve(data);
              });
            });
          })
          .then(data => {
            req.sessionModel.set('image-preview', data);
          })
          .then(() => next())
          .catch(next);
      }
    });
  }

};
