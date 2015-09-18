'use strict';

var proxyquire = require('proxyquire');

describe('controllers/rtm/confirm', function () {

  describe('.saveValues()', function () {

    var controller;
    var req;
    var res;
    var callback;

    
    var modelProto = {
      save: sinon.spy(),
      set: sinon.stub()
    };
    var Model = sinon.stub().returns(modelProto);
    
    var ConfirmController = proxyquire('../../../controllers/rtm/confirm', {
      '../../models/email': Model
    });

    beforeEach(function () {
      req = {
        sessionModel: {
          toJSON: sinon.stub().returns({some: 'data'})
        }
      };
      res = {};
      callback = sinon.stub();

      /*eslint no-unused-vars: 0*/
      ConfirmController.prototype.saveValues(req, res, callback);

    });
    
    it('should use the email service to send values', function () {
      /*eslint no-unused-vars: 1*/
      
      modelProto.save.should.have.been.called;
      
    });

    it('should pass a calback to the email service', function () {
      /*eslint no-unused-vars: 1*/
      
      modelProto.save.should.have.been.calledWith(callback);
      
    });

  });
    
});
