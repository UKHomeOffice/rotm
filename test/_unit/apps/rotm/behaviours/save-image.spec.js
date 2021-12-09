'use strict';

const Behaviour = require('../../../../../apps/rotm/behaviours/save-image');
const Controller = require('hof').controller;
const expect = chai.expect;

describe("apps/rotm 'save-image' behaviour should ", () => {
  it('export a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    process() {}
    locals() {}
    saveValues() {}
  }

  let req;
  let res;
  let next;
  const name = 'image'

  let instance;
  
  const images = {
    image: {
      name: 'test1.png',
      encoding: '7bit',
      mimetype: 'test1.png',
      truncated: false,
      size: 144148
    }
  }

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    req.files = images;
  });

  describe('The save-image \' process \' method', () => {

    before(() => {
      sinon.stub(Base.prototype, 'process');
      instance = new (Behaviour('name')(Base));
    });

    it('is called ', () => {
      req.files = images;
      instance.process(req);
      expect(Base.prototype.process).to.have.been.called;
    });

    it('has a file attached to it', () => {
      expect(req.files).to.eql(images);
    })

    it('adds files to form.values', () => {
      req.files['images'] = images;
      instance.process(req, res, next => {
        expect(req.form.values['name']).to.be.true.and.to.eql('test1.png');
      });
    })

    after(() => {
      Base.prototype.process.restore();
    })
  });

  describe('The save-image \' locals \' method', () => {

    before(() => {
      sinon.stub(Base.prototype, 'locals').returns(req, res, next);
      next = sinon.spy();
      instance = new (Behaviour('name')(Base));
    });

    it('is called ', () => {
      req.form.errors = {};
      instance.locals(req, res, next);
      expect(Base.prototype.locals).to.have.been.calledOnce;
    });
    
    it('returns the next step if no errors', () => {
      req.form.errors = {};;
      instance.locals(req, res, next => {
        expect(next).to.have.been.called;
      });
    });

    it('does not return next if there are errors', () => {
      req.form.errors = {errors: 'Error'};
      instance.locals(req, res, next => {
        expect(next).to.not.have.been.called;
        expect(req.form.values['evidence-upload']).to.eql(null);
      }); 
    });

    after(() => {
      Base.prototype.locals.restore();
    })
  });

  describe('The save-image \' saveValues \' method', () => {

    before(() => {
      sinon.stub(Base.prototype, 'saveValues').returns(req, res, next);
      next = sinon.spy();
      instance = new (Behaviour('name')(Base));
    });

    it('is called ', () => {
      instance.saveValues(req, res, next);
      expect(Base.prototype.saveValues).to.have.been.calledOnce;
    });

    it('returns a model ', () => {
      req.sessionModel.set('images', images);
      instance.saveValues(req, res, next => {
        expect(req.sessionModel.images).to.be.true;
        expect(req.sessionModel.get('images').image.name).to.eql('test1.png');
        expect(next).to.not.have.been.called;
      });
    });

    after(() => {
      Base.prototype.saveValues.restore();
    })
  });
});
