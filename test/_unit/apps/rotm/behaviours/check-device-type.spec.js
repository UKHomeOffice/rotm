'use strict';

// TODO Why are test files not loading from setup.js
const Behaviour = require('../../../../../apps/rotm/behaviours/check-device-type');
const expect = require('chai').expect;
const chai = require('chai').use(require('sinon-chai'));
const reqres = require('hof').utils.reqres;
const sinon = require('sinon');
const device = require('device');


describe('apps/rotm \'check-device-type\' behaviour should ', () => {
    it('export a function', () => {
      expect(Behaviour).to.be.a('function');
    });

    class Base {
      locals() {}
    }

    let req;
    let res;
    let instance;
    const callback = 'foo';

    beforeEach(() => {
      req = reqres.req();
      res = reqres.res();
    });

    describe('The locals method', () => {
        beforeEach(() => {
            sinon.stub(Base.prototype, 'locals').returns(res);
            instance = new (Behaviour(Base))();
            instance.locals(req, res);
        });
        it('always calls super.locals', () => {
            expect(Base.prototype.locals).to.have.been.called;
        });
        it('checks that device type is returned in the response is always unknown', () => {
            const checkReturnedData = instance.locals(req, res).locals;
            // TODO or CHECK - currently function will always back an 'unknown' for device type as useragent not atached to sessionModel
            // and 'get' method will not retrieve user-agent straight from the request.
            expect(checkReturnedData['device-desktop']).to.be.false;
            expect(checkReturnedData['device-phone']).to.be.false;
            expect(checkReturnedData['device-unknown']).to.be.true;
        });
        afterEach(() => {
            Base.prototype.locals.restore();
        });
    });

});