'use strict';

describe('controllers/confirm:send', function () {

  describe('sending emails', function () {

    var req;
    var res;
    var callback;

    var err;
    var buff;

    var ConfirmController = require('../../../apps/rtm/controllers/confirm');

    before(function (done) {
      req = {
        sessionModel: {
          toJSON: sinon.stub().returns({
            'report': [{
              /*eslint camelcase: 0*/
              website_url: 'a.url.com',
              trigger_warning: 'yes',
              content_locate_hint: '',
              content_description: '',
              email: 'an@email.address'
              // callback only called with nodemailer-stub-transport arguments
              // from services/email/index.js if a user recipient is given
            }]
          })
        },
        form: {
          values: {
            'anonymous': 'yes'
          }
        }
      };
      res = {};

      /*eslint no-unused-vars: 0*/
      ConfirmController.prototype.saveValues(req, res, function(e, b) {
        buff = b; err = e;
        done();
      });

    });

    it('should attempt to send an email', function (done) {

      /* in NODE_ENV=test, the smtp user is empty,
         which in turns means the nodemailer-stub-transport module is invoked
         which doesn't send any messages, but does return the email buffer in the callback
      */

      should.equal(buff.hasOwnProperty('envelope'), true);
      // better; email buffer object should have envelope property
      done();
    });

  });

});
