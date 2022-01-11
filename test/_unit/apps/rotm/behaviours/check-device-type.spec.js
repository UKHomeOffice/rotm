'use strict';

const Behaviour = require('../../../../../apps/rotm/behaviours/check-device-type');

describe("apps/rotm 'check-device-type' behaviour should ", () => {
  it('export a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    locals() {}
  }

  let req;
  let res;
  let next;
  let instance;

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    next = 'foo';
  });

  describe("The 'locals' method", () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'locals').returns(req, res, next);
      instance = new (Behaviour(Base))();
      req['user-agent'] = 'phone';
      instance.locals(req, res);
    });
    it('should be called', () => {
      expect(Base.prototype.locals).to.have.been.called;
    });
    it('should check that device type is returned in the response is always unknown', () => {
      const checkReturnedData = res.locals;
      expect(checkReturnedData['device-desktop']).to.be.false;
      expect(checkReturnedData['device-phone']).to.be.false;
      expect(checkReturnedData['device-unknown']).to.be.true;
    });
    afterEach(() => {
      Base.prototype.locals.restore();
    });
  });
});
