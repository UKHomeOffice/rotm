'use strict';

module.exports = {
  '/': {
    template: 'rtm/terrorism-reporting',
    controller: require('../../controllers/rtm/report'),
    fields: [
      'website_url',
      'trigger_warning',
      'content_locate_hint',
      'content_description'
    ],
    next: '/confirmation'
  },
  '/confirmation' : {
    template: 'rtm/confirm',
    controller: require('../../controllers/rtm/confirm'),
    backLink: '/',
    next: '/done'
  },
  '/done' : {
    template: 'rtm/complete',
    controller: require('../../controllers/rtm/complete'),
    backLink: null
  }
};
