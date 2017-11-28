'use strict';

const Behaviour = require('../../../apps/rotm/behaviours/get-image');
const reqres = require('hof-util-reqres');

describe('behaviours/get-image', () => {

  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  describe('render', () => {

    class Base {
      render() {}
    }

    const req = reqres.req();
    const res = reqres.res();
    const filename = 'file.png';

    let instance;

    beforeEach(() => {
      sinon.stub(Base.prototype, 'render').yields();
      sinon.stub(req.sessionModel, 'get').withArgs('image').returns({
        name: filename,
        mimetype: 'image/png',
        data: 'abc'
      });
      const GetImage = Behaviour(Base);
      instance = new GetImage();
    });

    afterEach(() => {
      Base.prototype.render.restore();
      req.sessionModel.get.restore();
    });

    it('assigns a data uri property called `image-preview` to locals', (done) => {
      instance.render(req, res, (err) => {
        expect(err).not.to.exist;
        expect(res.locals).to.have.property('image-preview').and.to.equal('data:image/png;base64,YWJj');
        done();
      });
    });

    it('assigns a string property called `image-name` to locals', (done) => {
      instance.render(req, res, (err) => {
        expect(err).not.to.exist;
        expect(res.locals).to.have.property('image-name').and.to.equal(filename);
        done();
      });
    });

    it('always calls super.render with arguments', (done) => {
      instance.render(req, res, (err) => {
        expect(err).not.to.exist;
        expect(Base.prototype.render).to.have.been.calledWith(req, res);
        done();
      });
    });

  });

});
