'use strict';

const proxyquire = require('proxyquire');

describe('Report Controller', () => {
  class StubController {}
  let Controller;
  let controller;
  beforeEach(() => {
    StubController.prototype.locals = sinon.stub().returns({});
    Controller = proxyquire('../../../../../apps/rotm/controllers/report', {
      'hof-controllers': {
        base: StubController
      }
    });
    controller = new Controller();
  });

  it('has a locals method', () => {
    controller.locals.should.be.a('function');
  });

  describe('public methods', () => {
    let req;
    let res;
    let cb;

    beforeEach(() => {
      req = {
        translate: function() {}
      };
      sinon.stub(req, 'translate', value => value);
    });

    describe('locals', () => {
      it('calls super', () => {
        controller.locals(req, res, cb);
        StubController.prototype.locals.should.have.been.calledOnce;
      });

      it('extends object returned from super with a new items property', () => {
        controller.locals(req, res, cb).should.be.eql({
          items: 'fields.description.items'
        });
      });
    });
  });
});
