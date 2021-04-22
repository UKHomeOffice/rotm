/* eslint no-process-env: 0 */
/* eslint no-inline-comments: 0 */
/* eslint camelcase: 0 */

'use strict';

const env = process.env.NODE_ENV || 'production';
const localhost = () => `${process.env.LISTEN_HOST || '0.0.0.0'}:${process.env.PORT || 8080}`;
const useMocks = process.env.USE_MOCKS ? process.env.USE_MOCKS === 'true' : env !== 'production';

module.exports = {
  env: env,
  csp: {
    imgSrc: ['data:']
  },
  useMocks: useMocks,
  dateTimeFormat: 'DD-MM-YYYY, hh:mma',
  port: process.env.PORT || 8080,
  session: {
    secret: process.env.SESSION_SECRET || 'howdoesyourgardengrow',
    ttl: process.env.SESSION_TTL || 1800, /* 30 mins timeout */
    name: process.env.SESSION_KEY || 'rotm.sid'
  },
  redis: {
    port: process.env.REDIS_PORT || '6379',
    host: process.env.REDIS_HOST || '127.0.0.1',
    password: process.env.REDIS_PASSWORD
  },
  email: {
    from: process.env.FROM_ADDRESS || 'gad',
    replyTo: process.env.REPLY_TO || 'gad',
    region: process.env.EMAIL_REGION || 'gad',
    transport: process.env.EMAIL_TRANSPORT || 'ses',
    caseworker: process.env.CASEWORKER_EMAIL || 'gad',
    transportOptions: {
      accessKeyId: process.env.HOF_SES_USER || process.env.AWS_USER || 'daga',
      secretAccessKey: process.env.HOF_SES_PASSWORD || process.env.AWS_PASSWORD || 'gadga',
      port: process.env.TRANSPORT_PORT || '',
      host: process.env.TRANSPORT_HOST || '',
      ignoreTLS: process.env.TRANSPORT_IGNORE_TLS || '',
      secure: process.env.TRANSPORT_SECURE || false
    }
  },
  upload: {
    maxFileSize: '100mb',
    hostname: !useMocks && process.env.FILE_VAULT_URL ?
      process.env.FILE_VAULT_URL :
      `http://${localhost()}/api/image-upload`

  },
  keycloak: {
    token: process.env.KEYCLOAK_TOKEN_URL,
    username: process.env.KEYCLOAK_USERNAME,
    password: process.env.KEYCLOAK_PASSWORD,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_SECRET
  },
};
