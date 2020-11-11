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
    return super.locals(req, res, callback);
  }
};
