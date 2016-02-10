'use strict';

process.title = 'rtm';

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
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
  },
  email: {
    caseworker: {
      rtm: process.env.CASEWORKER_EMAIL || ''
    },
    port: process.env.SMTP_PORT || '',
    host: process.env.SMTP_HOST || '',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASSWORD || ''
    },
    from: process.env.FROM_ADDRESS || '',
    ignoreTLS: process.env.EMAIL_IGNORE_TLS === 'true',
    secure: process.env.EMAIL_SECURE === 'true'
  },
  ga: {
    tagId: process.env.GA_TAG_ID
  }
};
