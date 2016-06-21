'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

describe('controllers/confirm', () => {

  describe('.saveValues()', () => {

    var req;
    var res;
    var callback;
    var modelProto;

    before(done => {

      modelProto = {
        save: function() {
          done();
        },
        set: sinon.stub()
      };
      var Model = sinon.stub().returns(modelProto);

      var ConfirmController = proxyquire('../../../apps/rtm/controllers/confirm', {
        '../../common/models/email': Model
      });

      req = {
        sessionModel: {
          toJSON: sinon.stub().returns({report: [{some: 'data'}]})
        },
        form: {
          values: {
            'anonymous': 'yes'
          }
        }
      };
      res = {};
      callback = sinon.stub();

      ConfirmController.prototype.saveValues(req, res, callback);

    });

    it('should use the email service to send values', done => {

      modelProto.set.should.have.been.called;
      done();

    });

  });
});
