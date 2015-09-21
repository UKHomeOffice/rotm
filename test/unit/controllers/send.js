'use strict';

describe('controllers/rtm/confirm:send', function () {
    
  var emailReturn = '';

  describe('sending emails', function () {

    var controller;
    var req;
    var res;
    var callback;
    
    var ConfirmController = require('../../../controllers/rtm/confirm');

    before(function (done) {
      req = {
        sessionModel: {
          toJSON: sinon.stub().returns({
            website_url: 'a.url.com',
            trigger_warning: 'yes',
            content_locate_hint: '',
            content_description: '',
            to: 'an@email.address' // callback is only called from services/email/index.js if a user recipient is given
          })
        }
      };
      res = {};

      callback = sinon.stub();
      
      /*eslint no-unused-vars: 0*/
      ConfirmController.prototype.saveValues(req, res, function(d){
        emailReturn = d;
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
      should.equal(emailReturn.substr(0,15), "<!doctype html>"); // first line of the html email template 
      done();
    });

  });
    
});
