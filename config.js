/* eslint no-process-env: 0 */
/* eslint no-inline-comments: 0 */
/* eslint camelcase: 0 */

'use strict';
require('dotenv').config();

const env = process.env.NODE_ENV;
const useMocks = process.env.USE_MOCKS === 'true' || !env;
const port = process.env.PORT;

module.exports = {
  env: env,
  csp: {
    imgSrc: ['data:']
  },
  useMocks: useMocks,
  dateTimeFormat: 'DD-MM-YYYY, hh:mma',
  port: port,
  session: {
    secret: process.env.SESSION_SECRET,
    ttl: process.env.SESSION_TTL,
    name: process.env.SESSION_KEY
  },
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
  },
  email: {
    from: process.env.FROM_ADDRESS,
    replyTo: process.env.REPLY_TO,
    region: process.env.EMAIL_REGION,
    transport: process.env.EMAIL_TRANSPORT,
    caseworker: process.env.CASEWORKER_EMAIL,
    notifyApiKey: process.env.NOTIFY_KEY,
    notifyTemplate: process.env.NOTIFY_TEMPLATE
  },
  hosts: {
    acceptanceTests: process.env.ACCEPTANCE_HOST_NAME || `http://localhost:${port}`
  },
  upload: {
    maxFileSize: '100mb',
    // if mocks set use file service served up by app otherwise use filevault's port 3000
    hostname: !useMocks && process.env.FILE_VAULT_URL ?
      process.env.FILE_VAULT_URL :
      `http://localhost:${useMocks ? port : 3000}/file`
  },
  keycloak: {
    token: process.env.KEYCLOAK_TOKEN_URL,
    username: process.env.KEYCLOAK_USERNAME,
    password: process.env.KEYCLOAK_PASSWORD,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    secret: process.env.KEYCLOAK_SECRET
  }
};
