'use strict';

const Behaviour = require('../../../apps/rotm/behaviours/save-image');
const reqres = require('hof-util-reqres');
const Model = require('../../../apps/rotm/models/image-upload');

describe('behaviours/save-image', () => {

  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    process() {}
    saveValues() {}
  }

  describe('process', () => {

    const filename = 'filename.png';

    let req;
    const res = reqres.res();

    let instance;

    beforeEach(() => {
      req = reqres.req({
        files: {
          image: {
            name: filename
          }
        }
      });
      sinon.stub(Base.prototype, 'process').yields();
      const SaveImage = Behaviour(Base);
      instance = new SaveImage();
    });

    afterEach(() => {
      Base.prototype.process.restore();
    });

    it('always calls super.process with arguments', (done) => {
      instance.process(req, res, (err) => {
        expect(err).not.to.exist;
        expect(Base.prototype.process).to.have.been.calledWith(req, res);
        done();
      });
    });

    describe('when an image is present', () => {

      it('assigns the image name to form values', (done) => {
        instance.process(req, res, (err) => {
          expect(err).not.to.exist;
          expect(req.form.values).to.have.property('image').and.to.equal(filename);
          done();
        });
      });

    });

  });

  describe('saveValues', () => {

    const filename = 'filename.png';
    const data = 'abc';
    const mimetype = 'image/png';

    let req = reqres.req();
    const res = reqres.res();
    const callback = sinon.stub();

    let instance;

    beforeEach(() => {
      sinon.stub(Model.prototype, 'save');
      sinon.stub(Model.prototype, 'set');
      sinon.stub(Base.prototype, 'saveValues').yields();
      const SaveImage = Behaviour(Base);
      instance = new SaveImage();
    });

    afterEach(() => {
      Model.prototype.save.restore();
      Model.prototype.set.restore();
      Base.prototype.saveValues.restore();
    });

    it('calls super.saveValues with arguments', () => {
      req = reqres.req({
        files: null
      });
      instance.saveValues(req, res, callback);
      expect(Base.prototype.saveValues).to.have.been.calledWithExactly(req, res, callback);
    });

    describe('when an image is present', () => {

      beforeEach(() => {
        Model.prototype.save.resolves();
        req = reqres.req({
          files: {
            image: {
              name: filename,
              data: data,
              mimetype: mimetype
            }
          }
        });
      });

      it('the image with name, data and mimetype is set to the Image Upload model', () => {
        instance.saveValues(req, res, callback);
        expect(Model.prototype.set).to.have.been.calledWith(sinon.match(req.files.image));
      });

      it('the image is saved to the Image Upload model', () => {
        instance.saveValues(req, res, callback);
        expect(Model.prototype.save).to.have.been.called;
      });

      describe('when save resolves with the result', () => {

        const result = {url: 'location/of/saved/image'};

        beforeEach(() => {
          Model.prototype.save.resolves(result);
        });

        it('the result url is assigned to the form values', (done) => {
          instance.saveValues(req, res, (err) => {
            expect(err).not.to.exist;
            expect(req.form.values).to.have.property('image-url').and.equal(result.url);
            done();
          });
        });

        it('super.saveValues is called with arguments', (done) => {
          instance.saveValues(req, res, (err) => {
            expect(err).not.to.exist;
            expect(Base.prototype.saveValues).to.have.been.calledWith(req, res);
            done();
          });
        });

      });

      describe('when save rejects the request with an error', () => {

        const error = new Error('Save rejected');

        beforeEach(() => {
          Model.prototype.save.rejects(error);
        });

        it('the next callback is called with a Validation error', (done) => {
          instance.saveValues(req, res, (err) => {
            expect(err).to.equal(error);
            done();
          });
        });

      });

    });

  });

});
