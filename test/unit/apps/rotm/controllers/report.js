'use strict';

const proxyquire = require('proxyquire');

describe('Report Controller', () => {
  class StubController {}
  let StubErrorController;
  let Controller;
  let controller;
  beforeEach(() => {
    StubErrorController = sinon.stub();
    StubController.prototype.locals = sinon.stub().returns({});
    Controller = proxyquire('../../../../../apps/rotm/controllers/report', {
      'hof-controllers': {
        base: StubController,
        error: StubErrorController
      }
    });
    controller = new Controller();
  });

  it('has a locals method', () => {
    controller.should.have.property('locals').that.is.a('function');
  });

  it('has a validateField method', () => {
    controller.should.have.property('validateField').that.is.a('function');
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

    describe('validateField', () => {
      let key;
      beforeEach(() => {
        key = 'description';
        req.form = {
          values: {}
        };
        StubController.prototype.validateField = sinon.stub();
      });

      it('calls super if the key isn\'t description', () => {
        controller.validateField('another-key', req);
        StubController.prototype.validateField.should.have.been.calledOnce
          .and.calledWithExactly('another-key', req);
      });

      it('returns a new Error controller if both url and description are falsy', () => {
        req.form.values.url = '';
        req.form.values.description = '';
        controller.validateField(key, req);
        StubErrorController.should.have.been.calledWithNew
          .and.calledWithExactly(key, {
            key,
            type: 'required'
          });
      });

      it('doesn\'t return an error if url is truthy', () => {
        req.form.values.url = 'http://something.com';
        req.form.values.description = '';
        controller.validateField(key, req);
        StubErrorController.should.not.have.been.called;
      });

      it('doesn\'t return an error if description is truthy', () => {
        req.form.values.url = '';
        req.form.values.description = 'Some text';
        controller.validateField(key, req);
        StubErrorController.should.not.have.been.called;
      });
    });
  });
});
