'use strict';

const reqres = require('hof-util-reqres');
const Behaviour = require('../../../apps/rotm/behaviours/remove-image');

describe('behaviours/remove-image', () => {

  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    getValues() {}
  }

  let req;
  let request;
  let res;
  let instance;
  let RemoveImage;

  beforeEach(() => {
    request = reqres.req;
    req = request();
    req.sessionModel.unset = sinon.stub();
    req.get = sinon.stub();
    res = reqres.res();
    RemoveImage = Behaviour(Base);
    instance = new RemoveImage();
  });

  describe('getValues()', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'getValues').yields();
    });

    afterEach(() => {
      Base.prototype.getValues.restore();
    });

    it('removes the image if the referrer is /image', (done) => {
      req.get.withArgs('Referrer').returns('localhost:8080/image');

      instance.getValues(req, res, () => {
        req.sessionModel.unset.should.be.calledWith('image');
        req.sessionModel.unset.should.be.calledWith('image-preview');
        req.sessionModel.unset.should.be.calledWith('image-url');
        done();
      });
    });

    it('does not remove the image if the referrer is not /image', (done) => {
      req.get.withArgs('Referrer').returns('localhost:8080/add-image');

      instance.getValues(req, res, () => {
        req.sessionModel.unset.should.not.be.called;
        done();
      });
    });
  });
});
