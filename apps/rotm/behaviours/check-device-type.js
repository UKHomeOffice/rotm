'use strict';

const Bowser = require('bowser');


module.exports = superclass => class extends superclass {
  locals(req, res, callback) {
    const userAgent = req.get('user-agent') || '';
    let platformType = 'unknown';

    if (userAgent) {
      try {
        platformType = Bowser.getParser(userAgent).getPlatformType(true);
      } catch (error) {
        platformType = 'unknown';
      }
    }

    const isDesktop = platformType === 'desktop';
    const isPhone = platformType === 'mobile' || platformType === 'tablet';

    res.locals['device-desktop'] = isDesktop;
    res.locals['device-phone'] = isPhone;
    res.locals['device-unknown'] = !isDesktop && !isPhone;
    req.log('info', `Submission ID: ${req.sessionModel.get('submissionID')}, 
                     Device Desktop: ${res.locals['device-desktop']}, 
                     Device Phone: ${res.locals['device-phone']},
                     Device Unknown: ${res.locals['device-unknown']}`);
    return super.locals(req, res, callback);
  }
};
