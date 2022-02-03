'use strict';

const Behaviour = require('../../../../../apps/rotm/behaviours/check-report');

describe("apps/rotm 'check-report' behaviour should ", () => {
  it('export a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    constructor() {}
    configure() {}
    locals() {}
  }

  let req;
  let res;
  let instance;
  const next = 'foo';

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
  });

  describe("The 'configure' method ", () => {
    before(() => {
      sinon.stub(Base.prototype, 'configure').returns(req, res, next);
      instance = new (Behaviour(Base))();
      req.sessionModel.set('can-we-contact', 'no');
      req.form.options = { sections: { contact: 'test@test.com' } };
      instance.configure(req, res, next);
    });
    it('should be called', () => {
      expect(Base.prototype.configure).to.have.been.called;
    });
    it('should delete contact section from form if user selects no', () => {
      const checkDeletion = req.form.options.sections;
      expect(checkDeletion).to.equal(undefined);
    });
    after(() => {
      Base.prototype.configure.restore();
    });
  });

  describe("The 'locals' method", () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'locals').returns(res);
      instance = new (Behaviour(Base))();
      req.sessionModel.set('images', 'image.png');
      req.sessionModel.set(
        'urls',
        'www.test1.com',
        'www.test2.com',
        'www.test3.com'
      );
      instance.locals(req, res);
    });
    it('should be called', () => {
      expect(Base.prototype.locals).to.have.been.called;
    });
    it('should check that images and urls are attached to the response', () => {
      const checkReturnedData = instance.locals(req, res).locals;
      expect(checkReturnedData.urls).to.contain('www.test1.com');
      expect(checkReturnedData.urls).to.eql(
        'www.test1.com',
        'www.test2.com',
        'www.test3.com'
      );
      expect(checkReturnedData.images).to.equal('image.png');
    });
    afterEach(() => {
      Base.prototype.locals.restore();
    });
  });
});
