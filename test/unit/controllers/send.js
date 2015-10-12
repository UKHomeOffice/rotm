'use strict';

describe('controllers/confirm:send', function () {

  describe('sending emails', function () {

    var req;
    var res;
    var callback;

    var err;
    var buff;

    var ConfirmController = require('../../../controllers/confirm');

    before(function (done) {
      req = {
        sessionModel: {
          toJSON: sinon.stub().returns({
            /*eslint camelcase: 0*/
            website_url: 'a.url.com',
            trigger_warning: 'yes',
            content_locate_hint: '',
            content_description: '',
            email: 'an@email.address'
            // callback only called with nodemailer-stub-transport arguments
            // from services/email/index.js if a user recipient is given
          })
        }
      };
      res = {};

      callback = sinon.stub();

      /*eslint no-unused-vars: 0*/
      ConfirmController.prototype.saveValues(req, res, function(e, d) {
        err = e; buff = d;
        callback();
        done();
      });

    });

    it('should attempt to send an email', function (done) {

      /* in NODE_ENV=test, the smtp user is empty,
         which in turns means the nodemailer-stub-transport module is invoked
         which doesn't send any messages, but does return the email buffer in the callback
      */

      callback.should.have.been.called;
      should.equal(err, null);

      should.equal(buff.hasOwnProperty('envelope'), true);
      // better; email buffer object should have envelope property
      done();
    });

  });

});
