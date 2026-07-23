var bodyparser = require('../../../utils/busboy-body-parser.js');
var bodyparserReal = require('../../../utils/busboy-body-parser.js');
var chai = require('chai');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
var Readable = require('stream').Readable;
var EventEmitter = require('events');

chai.use(require('sinon-chai'));

var Busboy = require('busboy');

describe("multipart form parser ", () => {

  var parser, req, res, next;

  beforeEach(() => {
    parserInstance = {
      on: sinon.stub().returnsThis()
    }

    next = sinon.stub();

    busboyStub = sinon.stub().returns(parserInstance);

    bodyparser = proxyquire('../../../utils/busboy-body-parser.js', {
      busboy: busboyStub
    });

    req = {
      headers: {
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      },
      is: sinon.stub().returns(true),
      pipe: sinon.stub()
    };

    res = {};
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call busboy with the correct headers', () => {
    var parser = bodyparser();
    parser(req, res, next);
    expect(busboyStub).to.have.been.calledWith({
      headers: req.headers,
      limits: {
        fileSize: 262144000
      }
    });
  });

  it('calls callback if not a multipart/form-data request', () => {
    req.is = sinon.stub().returns(false);
    var parser = bodyparser();
    parser(req, res, next);
    expect(next).to.have.been.called;
  });

  it('pipes request to busboy instance', () => {
    var parser = bodyparser();
    parser(req, res, next);
    req.pipe.should.have.been.calledOnce;
    expect(req.pipe).to.have.been.calledOnceWithExactly(parserInstance);
  });

  it('handles a busboy error if payload invalid', (done) => {
    var busboyErr = new Error('Invalid payload');
    var parser = bodyparser();
    parserInstance.on.withArgs('error').yields(busboyErr);
    parser(req, res, function (err) {
      err.should.equal(busboyErr);
      done();
    });
  });

  it('handles busboy error if headers invalid', (done) => {
    var parser = bodyparser();
    req.headers = {
      'content-type': 'multipart/form-data',
    };
    busboyStub.throws(new Error('Invalid content-type header'));
    parser(req, res, function (error) {
      error.should.be.instanceOf(Error);
      done();
    });
  });

  it('creates req.body and req.files as empty obj if not existing', (done) => {
    var parser = bodyparser();
    parserInstance.on.withArgs('finish').yieldsAsync();
    parser(req, res, () => {
      req.body.should.eql({});
      req.files.should.eql({});
      done();
    });
  });

  it('sets fields on req.body', (done) => {
    var parser = bodyparser();
    parserInstance.on.withArgs('field').yieldsAsync('key', 'value');
    parserInstance.on.withArgs('finish').yieldsAsync();

    parser(req, res, () => {
      req.body.should.eql({ key: 'value' });
      done();
    });
  });

  it('sets files on req.files', (done) => {
    var parser = bodyparser();
    var file = {
      pipe: function (s) {
        s.end('abcdef123456');
        process.nextTick(() => {
          parserInstance.on.withArgs('finish').should.have.been.called;
        });
      },
      truncated: false
    };
    parserInstance.on.withArgs('file').yieldsAsync('key', file, { filename: 'testing.png', encoding: 'binary', mimeType: 'image/png' });
    parserInstance.on.withArgs('finish').yieldsAsync();
    parser(req, res, () => {
      req.files.should.have.property('key');
      req.files.key.should.eql({
        data: Buffer('abcdef123456'),
        name: 'testing.png',
        encoding: 'binary',
        mimetype: 'image/png',
        truncated: false,
        size: 12
      });
      done();
    });
  });

  it('sets truncated prop and null data if file exceeds max limit (real busboy instance)', (done) => {
    var boundary = '----testBoundary';
    var payload = multipartBody(boundary, 'abcdef123456'); // 12 bytes

    var req = {
      headers: {
        'content-type': 'multipart/form-data; boundary=' + boundary,
        'content-length': String(payload.length)
      },
      is: sinon.stub().returns(true),
      pipe: function (dest) {
        return Readable.from([payload]).pipe(dest);
      }
    };

    var res = {};
    var parser = bodyparserReal({ limit: 4 });

    parser(req, res, function (err) {
      if (err) { return done(err); }

      req.files.should.have.property('file');
      req.files.file.truncated.should.equal(true);
      chai.expect(req.files.file.data).to.equal(null);
      chai.expect(req.files.file.size).to.equal(null);
      done();
    });
  });

  it('sets files as an array to handle multi attachment', (done) => {
    var parserInstance = new EventEmitter();
    busboyStub = sinon.stub().returns(parserInstance);

    bodyparser = proxyquire('../../../utils/busboy-body-parser.js', {
      busboy: busboyStub
    });

    var parser = bodyparser({ multi: true });

    var file1 = { pipe: s => s.end('abcdef123456'), truncated: false };
    var file2 = { pipe: s => s.end('uvwxyz789012'), truncated: false };

    req.pipe = sinon.stub().callsFake(() => {
      parserInstance.emit('file', 'key', file1, { filename: 'testing1.png', encoding: 'binary', mimeType: 'image/png' });
      parserInstance.emit('file', 'key', file2, { filename: 'testing2.png', encoding: 'binary', mimeType: 'image/png' });
      parserInstance.emit('finish');
    });

    parser(req, res, () => {
      req.files.key.should.have.length(2);
      req.files.key[0].name.should.equal('testing1.png');
      req.files.key[1].name.should.equal('testing2.png');
      done();
    });
  });

  it('can handle empty payloads', (done) => {
    var parser = bodyparser();

    parserInstance.on.withArgs('finish').yieldsAsync();

    parser(req, res, () => {
      req.files.should.eql({});
      done();
    });
  });

  it('can handle empty files', (done) => {
    var parser = bodyparser();
    var file = {
      pipe: function (s) {
        s.end();
        process.nextTick(() => { parserInstance.on.withArgs('finish').should.have.been.called });
      },
      truncated: false
    };
    parserInstance.on.withArgs('file').yieldsAsync('key', file, { filename: '', encoding: 'binary', mimeType: 'image/png' });
    parserInstance.on.withArgs('finish').yieldsAsync();
    parser(req, res, () => {
      req.files.should.eql({});
      done();
    });
  });

  it('can handle files without a filename', (done) => {
    var parser = bodyparser();
    var file = {
      pipe: function (s) {
        s.end('abcdef123456');
        process.nextTick(() => { parserInstance.on.withArgs('finish').should.have.been.called });
      },
      truncated: true
    };
    parserInstance.on.withArgs('file').yieldsAsync('key', file, { filename: undefined, encoding: '7bit', mimeType: 'application/octet-stream' });
    parserInstance.on.withArgs('finish').yieldsAsync();
    parser(req, res, () => {
      req.files.should.have.property('key');
      req.files.key.should.eql({
        data: null,
        name: null,
        encoding: '7bit',
        mimetype: 'application/octet-stream',
        truncated: true,
        size: null
      });
      done();
    });
  });

});

function multipartBody(boundary, content) {
  return Buffer.from(
    '--' + boundary + '\r\n' +
    'Content-Disposition: form-data; name="file"; filename="testing.png"\r\n' +
    'Content-Type: image/png\r\n\r\n' +
    content + '\r\n' +
    '--' + boundary + '--\r\n'
  );
}
