'use strict';
const device = require('device');

module.exports = superclass => class extends superclass {
  locals(req, res, callback) {
    const client = device(req.get('user-agent'), {
      emptyUserAgentDeviceType: 'unknown',
      unknownUserAgentDeviceType: 'unknown'
    });
    res.locals['device-desktop'] = client.type === 'desktop';
    res.locals['device-phone'] = client.type === 'phone';
    res.locals['device-unknown'] = client.type !== 'desktop' && client.type !== 'phone';
    req.log('info', `Submission ID: ${req.sessionModel.get('submissionID')}, 
                     Device Desktop: ${res.locals['device-desktop']}, 
                     Device Phone: ${res.locals['device-phone']},
                     Device Unknown: ${res.locals['device-unknown']}`);
    return super.locals(req, res, callback);
  }
};
