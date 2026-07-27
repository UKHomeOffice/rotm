const Busboy = require('busboy');
const bl = require('bl');

module.exports = inputSettings => {
  const settings = {
    limit: 100 * 1024 * 1024, // default 100mib in bytes
    multi: false,
    ...(inputSettings || {})
  };

  if (Number.isInteger(settings.limit)) {
    settings.limit = settings.limit;
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
      req.log('Received field %s: %s', key, value);
      req.body[key] = value;
    });
    busboy.on('file', function (key, file, info) {
      const { filename, encoding, mimeType } = info;
      file.pipe(bl(function (err, d) {
        if (!(d.length || filename)) { return; } // if no file passed, do nothing
        if (err) {
          const errorMessage = `Failed to process file during streaming operation: ${err}`;
          req.log('error', errorMessage);
          next(new Error(errorMessage));
          return;
        }
        const fileData = {
          data: file.truncated ? null : d,
          name: filename || null,
          encoding: encoding,
          mimetype: mimeType,
          truncated: file.truncated,
          size: file.truncated ? null : Buffer.byteLength(d, 'binary')
        };

        req.log('Received file %s', file);

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
      req.log('Error parsing form');
      req.log(err);
      error = err;
      next(err);
    });
    busboy.on('finish', () => {
      if (error) { return; }
      req.log('Finished form parsing');
      req.log(req.body);
      next();
    });
    req.files = req.files || {};
    req.body = req.body || {};
    req.pipe(busboy);
  };
};
