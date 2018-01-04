'use strict';

const reqres = require('hof-util-reqres');
const Behaviour = require('../../../apps/rotm/behaviours/back-link-check-report');

describe('apps/behaviours/back-link-check-report', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    getBackLink() {}
  }
  let req;
  let res;
  let instance;
  let callback;
  let GetBackLink;

  const superGetBackLink = 'add-image-page';

  describe('getBackLink()', () => {
    beforeEach(() => {
      req = reqres.req();
      res = reqres.res();
      callback = sinon.stub();
      GetBackLink = Behaviour(Base);
      instance = new GetBackLink();
    });

    it('does not set backLink to image if it has a value', () => {
      sinon.stub(Base.prototype, 'getBackLink').returns(superGetBackLink);
      const result = instance.getBackLink(req, res, callback);
      expect(result).equal('add-image-page');
      Base.prototype.getBackLink.restore();
    });

    it('sets backLink to image if it is undefined', () => {
      const result = instance.getBackLink(req, res, callback);
      expect(result).equal('image');
    });
  });
});
