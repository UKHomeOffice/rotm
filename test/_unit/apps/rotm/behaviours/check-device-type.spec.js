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
  let reqGet;

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    next = 'foo';
  });

  describe("The 'locals' method", () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'locals').returns(req, res, next);
      instance = new (Behaviour(Base))();
      reqGet = req.get;
    });
    it('should be called', () => {
      reqGet.returns('');
      instance.locals(req, res);
      expect(Base.prototype.locals).to.have.been.called;
    });
    it('should identify desktop user-agents', () => {
      const desktopUa = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        + ' (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';
      reqGet.returns(desktopUa);
      instance.locals(req, res);

      const checkReturnedData = res.locals;
      expect(checkReturnedData['device-desktop']).to.be.true;
      expect(checkReturnedData['device-phone']).to.be.false;
      expect(checkReturnedData['device-unknown']).to.be.false;
    });

    it('should identify mobile user-agents as phone', () => {
      const mobileUa = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15'
        + ' (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';
      reqGet.returns(mobileUa);
      instance.locals(req, res);

      const checkReturnedData = res.locals;
      expect(checkReturnedData['device-desktop']).to.be.false;
      expect(checkReturnedData['device-phone']).to.be.true;
      expect(checkReturnedData['device-unknown']).to.be.false;
    });

    it('should default to unknown when user-agent is missing', () => {
      reqGet.returns('');
      instance.locals(req, res);

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
