'use strict';

describe('controllers/rtm/confirm:send', function () {
    
  describe('sending emails', function () {

    var controller;
    var req;
    var res;
    var callback;

    var emailResult = '';
    
    var ConfirmController = require('../../../controllers/rtm/confirm');

    beforeEach(function (done) {
      req = {
        sessionModel: {
          toJSON: sinon.stub().returns({
            website_url: 'a.url.com',
            trigger_warning: 'yes',
            content_locate_hint: '',
            content_description: ''
          })
        }
      };
      res = {};

      /*eslint no-unused-vars: 0*/
      ConfirmController.prototype.saveValues(req, res, function(){
        console.log("I was never called");
        done();
      });

    });
    
    it('should attempt to send an email', function (d) {
      /*eslint no-unused-vars: 1*/

      console.log(d);
//      emailResult = ?
      
    });

  });
    
});
