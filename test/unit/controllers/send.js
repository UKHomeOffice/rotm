'use strict';

describe('controllers/rtm/confirm:send', function () {
    
  describe('sending emails', function () {

    var controller;
    var req;
    var res;
    var callback;

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

      callback = sinon.stub();
      
      /*eslint no-unused-vars: 0*/
      ConfirmController.prototype.saveValues(req, res, function(){ callback(); done(); });

    });
    
    it('should attempt to send an email', function (done) {
      /*eslint no-unused-vars: 1*/

      callback.should.have.been.called;

      //TODO
      /* actually test it */
      
      done();
    });

  });
    
});
