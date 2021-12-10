'use strict';

const { expect } = require('chai');
const Behaviour = require('../../../../../apps/rotm/behaviours/caseworker-email');

describe("apps/rotm 'caseworker-email' behaviour should ", () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    constructor() {}
  }

  let settings = {
    from: 'h@h.com',
    replyTo: 'd@d.com',
    region: 'fakestring',
    transport: 'stub',
    caseworker: 'caseWorker@caseWorkder.com',
    transportOptions: {
      accessKeyId: 'fakeemail',
      secretAccessKey: 'randompass',
      port: '',
      host: '',
      ignoreTLS: '',
      secure: false
    }
  };

  let req;
  let res;
  const next = 'foo';
  let instance;

  beforeEach(() => {
    req = reqres.req();
    res = reqres.res();
  });

  describe("Checks 'caseworker-email' ", () => {
    beforeEach(() => {
      sinon.stub(Base.prototype, 'constructor').returns({req, res, next});
      instance = Behaviour(Base);
    });

    it('is being called', () => {
      instance(req, res, next);
      expect(instance).to.be.called;
    });
  });
});
