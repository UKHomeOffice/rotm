'use strict';

const sharp = require('sharp');

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
        const image = req.files.image;
        sharp(req.files.image.data)
          .resize(200)
          .toBuffer()
          .then(data => {
            const base64 = data.toString('base64');
            req.sessionModel.set('image-preview', `data:${image.mimetype};base64,${base64}`);
            next();
          })
          .catch(next);
      }
    });
  }

};
