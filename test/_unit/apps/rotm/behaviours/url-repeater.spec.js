'use strict';

const { expect } = require('chai');
const Behaviour = require('../../../../../apps/rotm/behaviours/url-repeater');

describe("apps/rotm 'url-repeater' behaviour should ", () => {
  it('export a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    saveValues() {}
    getValues() {}
  }

  let req;
  let res;
  let instance;
  let next;

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
    next = sinon.spy();

    req.sessionModel.get = sinon.stub();
    req.sessionModel.set = sinon.spy();
    req.log = sinon.spy();
  });

  describe('The \'saveValues\' method', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'saveValues').returns(res);

      instance = new (Behaviour(Base))();

      req.form.values.url = 'www.test1.com';
      req.form.values['another-url-1'] = 'www.test2.com';
      req.form.values['another-url-2'] = '';
      req.form.values['another-url-3'] = '';
      req.form.values['another-url-4'] = '';

      req.sessionModel.get.callsFake(key => {
        if (key === 'submissionID') return '123';
        if (key === 'ipaddress') return '127.0.0.1';
        if (key === 'remote_port') return 8080;
        return null;
      });

      instance.saveValues(req, res, next);
    });

    it('should be called', () => {
      expect(Base.prototype.saveValues).to.have.been.called;
    });

    it('eliminates empty urls from the form', () => {
      expect(req.form.values.urls).to.deep.equal([
        'www.test1.com',
        'www.test2.com'
      ]);
    });

    it('logs the remote port', () => {
      expect(req.log).to.have.been.calledWith(
        'info',
        sinon.match(/Port: 8080/)
      );
    });

    afterEach(() => {
      Base.prototype.saveValues.restore();
    });
  });

  describe('The \'getValues\' method', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'getValues').callsFake((_req, _res, cb) => {
        cb(null, {});
      });

      req.connection = { remotePort: 3000 };

      instance = new (Behaviour(Base))();
      instance.getValues(req, res, next);
    });

    it('should be called', () => {
      expect(Base.prototype.getValues).to.have.been.called;
    });

    it('saves the remote port in session', () => {
      expect(req.sessionModel.set).to.have.been.calledWith(
        'remote_port',
        3000
      );
    });

    afterEach(() => {
      Base.prototype.getValues.restore();
    });
  });
});
