'use strict';

/* parse out some ENV vars */
/* docker-compose / kubernetes dev or local */
var redis_endpoint = process.env.REDIS_PORT || 'tcp://127.0.0.1:6379';
var redis_regexp = /tcp:\/\/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d{1,4})/g;
var redis_details = redis_regexp.exec(redis_endpoint);
var redis_addr = redis_details[1];
var redis_port = redis_details[2];

process.title = 'rtm_node';

/*eslint no-process-env: 0*/
/*eslint no-inline-comments: 0*/
/*eslint camelcase: 0*/
module.exports = {
  env: process.env.NODE_ENV || 'local',
  siteroot: process.env.SITEROOT || '',
  port: process.env.PORT || 8080,
  listen_host: process.env.LISTEN_HOST || '0.0.0.0',
  session: {
    secret: process.env.SESSION_SECRET || 'howdoesyourgardengrow',
    ttl: process.env.SESSION_TTL || 1800 /* 30 mins timeout */
  },
  redis: {
    port: redis_port,
    host: redis_addr
  },
  email: {
    caseworker: {
      rtm: process.env.CASEWORKER_EMAIL || ''
    },
    port: process.env.EMAIL_PORT || 587,
    host: process.env.EMAIL_HOST || 'email-smtp.eu-west-1.amazonaws.com',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASSWORD || ''
    },
    from: process.env.FROM_ADDRESS || 'brp@dsp.notprod.homeoffice.gov.uk'
  }
};
