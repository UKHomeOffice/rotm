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
  });

  describe('The saveValues method', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'saveValues').returns(res, res, next);
      instance = new (Behaviour(Base))();
      req.form.values.urls = [
        req.form.values.url,
        (req.form.values['another-url-1'] = 'www.test1.com'),
        (req.form.values['another-url-2'] = 'www.test2.com'),
        (req.form.values['another-url-3'] = ''),
        (req.form.values['another-url-4'] = '')
      ];
      instance.saveValues(req, res, next);
    });
    it('always calls saveValues', () => {
      expect(Base.prototype.saveValues).to.have.been.called;
    });
    it('eliminates empty urls from the form', () => {
      expect(req.form.values.urls)
        .to.be.an('array')
        .that.does.not.include('');
      expect(req.form.values.urls).to.have.lengthOf(2);
    });
    afterEach(() => {
      Base.prototype.saveValues.restore();
    });
  });

  describe('The getValues method', () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'getValues').returns(req, res, next);
      instance = new (Behaviour(Base))();
      instance.getValues(req, res, next);
    });

    it('gets callee', () => {
      expect(Base.prototype.getValues).to.have.been.called;
    });

    afterEach(() => {
      Base.prototype.getValues.restore();
    });
  });
});
