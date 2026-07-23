const Busboy = require('busboy');
const bytes = require('bytes');
const bl = require('bl');
const debug = require('debug')('busboy-body-parser');

const HARDLIMIT = bytes('250mb');

module.exports = inputSettings => {
  const settings = {
    limit: HARDLIMIT,
    multi: false,
    ...(inputSettings || {})
  };

  if (typeof settings.limit === 'string') {
    settings.limit = bytes(settings.limit);
  }

  if (settings.limit > HARDLIMIT) {
    debug('WARNING: The busboy body parser file size limit set too high');
    debug('This form can only handle files up to ' + HARDLIMIT + ' bytes');
    settings.limit = HARDLIMIT;
  }

  return function multipartBodyParser(req, res, next) {
    if (!req.is('multipart/form-data')) {
      next();
      return;
    }
    let busboy;
    try {
      busboy = Busboy({
        headers: req.headers,
        limits: {
          fileSize: settings.limit
        }
      });
    } catch (err) {
      next(err);
      return;
    }
    busboy.on('field', function (key, value) {
      debug('Received field %s: %s', key, value);
      req.body[key] = value;
    });
    busboy.on('file', function (key, file, info) {
      const { filename, encoding, mimeType } = info;
      file.pipe(bl(function (err, d) {
        if (err || !(d.length || filename)) { return; }
        const fileData = {
          data: file.truncated ? null : d,
          name: filename || null,
          encoding: encoding,
          mimetype: mimeType,
          truncated: file.truncated,
          size: file.truncated ? null : Buffer.byteLength(d, 'binary')
        };

        debug('Received file %s', file);

        if (settings.multi) {
          req.files[key] = req.files[key] || [];
          req.files[key].push(fileData);
        } else {
          req.files[key] = fileData;
        }
      }));
    });
    let error;
    busboy.on('error', err => {
      debug('Error parsing form');
      debug(err);
      error = err;
      next(err);
    });
    busboy.on('finish', () => {
      if (error) { return; }
      debug('Finished form parsing');
      debug(req.body);
      next();
    });
    req.files = req.files || {};
    req.body = req.body || {};
    req.pipe(busboy);
  };
};
