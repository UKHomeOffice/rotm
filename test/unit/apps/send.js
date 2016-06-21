/* eslint camelcase: 0*/

'use strict';

describe('controllers/confirm:send', () => {

  describe('sending emails', () => {
    let req;
    let res;
    let buff;

    var ConfirmController = require('../../../apps/rtm/controllers/confirm');

    before(done => {
      req = {
        sessionModel: {
          toJSON: sinon.stub().returns({
            'report': [{
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

      ConfirmController.prototype.saveValues(req, res, (e, b) => {
        buff = b;
        done();
      });

    });

    it('should attempt to send an email', done => {

      /* in NODE_ENV=test, the smtp user is empty,
         which in turns means the nodemailer-stub-transport module is invoked
         which doesn't send any messages, but does return the email buffer in the callback
      */

      buff.should.have.property('envelope');
      // better; email buffer object should have envelope property
      done();
    });

  });

});
