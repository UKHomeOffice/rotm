/* eslint no-process-env: 0 */
/* eslint no-inline-comments: 0 */
/* eslint camelcase: 0 */

'use strict';

const env = process.env.NODE_ENV;
const useMocks = process.env.USE_MOCKS === 'true' || !env;

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
    from: process.env.FROM_ADDRESS || '',
    replyTo: process.env.REPLY_TO || '',
    region: process.env.EMAIL_REGION || '',
    caseworker: process.env.CASEWORKER_EMAIL ||  'sas-hof-test@digital.homeoffice.gov.uk',
    notifyApiKey: process.env.NOTIFY_KEY ,
    notifyTemplate: process.env.NOTIFY_TEMPLATE || '5734dfd3-ea54-4b86-8914-0458d8895559'
  },
  hosts: {
    acceptanceTests: process.env.ACCEPTANCE_HOST_NAME || `http://localhost:${process.env.PORT || 8080}`
  },
  upload: {
    maxFileSize: '100mb',
    // if mocks set use file service served up by app otherwise use filevault's port 3000
    hostname: !useMocks && process.env.FILE_VAULT_URL ?
      process.env.FILE_VAULT_URL :
      `http://localhost:${useMocks ? (process.env.PORT || 8080) : 3000}/file`
  },
  keycloak: {
    token: process.env.KEYCLOAK_TOKEN_URL,
    username: process.env.KEYCLOAK_USERNAME,
    password: process.env.KEYCLOAK_PASSWORD,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_SECRET
  }
};
