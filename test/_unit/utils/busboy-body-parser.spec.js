var bodyparser = require('../../../utils/busboy-body-parser.js');
var chai = require('chai');
var sinon = require('sinon');
var proxyquire = require('proxyquire');
chai.use(require('sinon-chai'));

var Busboy = require('busboy');

describe("multipart form parser ", () => {

  var parser, req, res, next;

  beforeEach(() => {
    parserInstance = {
      on: sinon.stub().returnsThis()
    }

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

});