'use strict';

module.exports = superclass => class extends superclass {

  render(req, res, callback) {
    const image = req.sessionModel.get('image');
    const data = image.data;

    if (data) {
      const base64 = new Buffer(data, 'binary').toString('base64');

      Object.assign(res.locals, {
        'image-name': image.name,
        'image-preview': `data:${image.mimetype};base64,${base64}`
      });

      return super.render(req, res, callback);
    }

    super.render(req, res, callback);
  }

};
