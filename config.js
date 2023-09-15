/* eslint no-process-env: 0 */
/* eslint no-inline-comments: 0 */
/* eslint camelcase: 0 */

'use strict';

const env = process.env.NODE_ENV;
const useMocks = process.env.USE_MOCKS === 'true' || !env;
const port = process.env.PORT || 8080;

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
    ttl: process.env.SESSION_TTL, /* 30 mins timeout */
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
    transportOptions: {
      accessKeyId: process.env.HOF_SES_USER || process.env.AWS_USER,
      secretAccessKey: process.env.HOF_SES_PASSWORD || process.env.AWS_PASSWORD,
      port: process.env.TRANSPORT_PORT,
      host: process.env.TRANSPORT_HOST,
      ignoreTLS: process.env.TRANSPORT_IGNORE_TLS,
      secure: Boolean(process.env.TRANSPORT_SECURE),
      auth: {
        user: process.env.HOF_SES_USER || process.env.AWS_USER,
        pass: process.env.HOF_SES_PASSWORD || process.env.AWS_PASSWORD
      }
    }
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
