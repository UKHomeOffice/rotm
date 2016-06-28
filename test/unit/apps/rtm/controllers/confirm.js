'use strict';

const proxyquire = require('proxyquire');

class ControllerStub {}

const Controller = proxyquire('../../../../../apps/rtm/controllers/confirm', {
  hof: {
    controllers: {
      base: ControllerStub
    }
  }
});

describe('Confirm Controller', () => {
  const req = {};
  const res = {};
  let callback;
  let controller;

  beforeEach(() => {
    callback = sinon.stub();
    controller = new Controller();
    req.sessionModel = {
      get: sinon.stub().returns([{id: 1}, {id: 2}, {id: 3}])
    };
  });

  describe('get', () => {
    beforeEach(() => {
      res.redirect = sinon.stub();
      ControllerStub.prototype.get = sinon.stub();
      ControllerStub.prototype.getBackLink = sinon.stub().returns('back-link');
    });

    it('calls super.get when there are reports', () => {
      controller.get(req, res, callback);
      ControllerStub.prototype.get.should.have.been.calledOnce
        .and.calledWithExactly(req, res, callback);
    });

    it('redirects to previous page if reports are not set', () => {
      req.sessionModel.get.returns([]);
      controller.get(req, res, callback);
      res.redirect.should.have.been.calledOnce.and.calledWithExactly('back-link');
    });
  });

  describe('getValues', () => {
    it('calls callback with the reports from sessionModel', () => {
      controller.getValues(req, res, callback);
      callback.should.have.been.calledOnce.and.calledWithExactly(null, {
        reports: [{id: 1}, {id: 2}, {id: 3}]
      });
    });
  });
});
