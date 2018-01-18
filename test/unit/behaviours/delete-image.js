'use strict';

const reqres = require('hof-util-reqres');
const Behaviour = require('../../../apps/rotm/behaviours/delete-image');

describe('behaviours/delete-image', () => {

  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    saveValues() {}
  }

  let req;
  let request;
  let res;
  let instance;
  let DeleteImage;

  beforeEach(() => {
    request = reqres.req;
    req = request();
    req.sessionModel.unset = sinon.stub();
    res = reqres.res();
    DeleteImage = Behaviour(Base);
    instance = new DeleteImage();
  });

  describe('saveValues()', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'saveValues').yields();
    });

    afterEach(() => {
      Base.prototype.saveValues.restore();
    });

    it('removes the image if the user selects no I want to delete the image', (done) => {
      req.form = {
        values: {
          'add-image': 'no'
        }
      };

      instance.saveValues(req, res, () => {
        req.sessionModel.unset.should.be.calledWith('image');
        req.sessionModel.unset.should.be.calledWith('image-preview');
        req.sessionModel.unset.should.be.calledWith('image-url');
        done();
      });
    });

    it('does not remove the image if the user selects yes I want to keep the image', (done) => {
      req.form = {
        values: {
          'add-image': 'yes'
        }
      };

      instance.saveValues(req, res, () => {
        req.sessionModel.unset.should.not.be.called;
        done();
      });
    });
  });
});
