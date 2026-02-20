# Report Online Terrorist Material (ROTM)

[![Docker Repository on Quay.io](https://quay.io/repository/ukhomeofficedigital/rotm/status "Docker Repository on Quay.io")](https://quay.io/repository/ukhomeofficedigital/rotm) [![Build Status](https://travis-ci.org/UKHomeOffice/rotm.svg?branch=master)](https://travis-ci.org/UKHomeOffice/rotm)

This project is built with [HOF](https://github.com/UKHomeOffice/hof) and uses [Docker](https://www.docker.com/).

## Getting started

Get the project from GitHub
```bash
$ git clone git@github.com:UKHomeOffice/rotm.git && cd rotm
```

Install the dependencies and build the project resources
```bash
$ yarn
```

[Install Docker Compose](https://docs.docker.com/compose/install/)

Run the services locally with Docker Compose
```bash
$ docker-compose up
```

Getting your hands dirty (You'll need [Redis](http://redis.io/) for this)
```bash
$ yarn start:dev
```

For anything else ROTM-related, look in [package.json](./package.json) for a full list of scripts etc, and
[config.js](./config.js) for environment variables.

Otherwise, see [HOF](https://github.com/UKHomeOffice/hof).

### Environment variables
You'll need to set the following env vars to run the application:

NOTIFY_KEY                     | Your GOV.UK notify key
NOTIFY_TEMPLATE                | GOV.UK notify template ID for user authorisation email
CASEWORKER_EMAIL               | Caseworker email
REFERRALS_EMAIL                | Referrals email
AWS_SECRET_ACCESS_KEY          | AWS Secret Access Key
AWS_ACCESS_KEY_ID              | AWS Access Key ID
FILE_VAULT_URL                 | The url that the file-vault service is running on
KEYCLOAK_TOKEN_URL             | The url of the keycloak server
KEYCLOAK_CLIENT_ID             | The client name used to authenticate with keycloak
KEYCLOAK_SECRET                | The secret used to authenticate with the keycloak client
KEYCLOAK_USERNAME              | Administrator username to authenticate with the keycloak client
KEYCLOAK_PASSWORD              | Administrator password used to authenticate with the keycloak client
RECAPTCHA_SITE_KEY_SCORE       | Recaptcha SCORE site key
RECAPTCHA_SITE_KEY_CHECKBOX    | Recaptcha CHECKBOX site key
RECAPTCHA_PROJECT_ID           | Recaptcha project ID
RECAPTCHA_THRESHOLD            | Recaptcha threshold (defaults to 0)

To set up HAProxy and Openresty, you will need to set the following environment variables in your openresty deployment kube file:
HAPROXY_UPSTREAM               | HAProxy upstream configuration
HAPROXY_UPSTREAM_SSL           | HAProxy upstream configuration
WAF_ADMIN_SALT                 | 32+ character random salt for password hashing
WAF_ADMIN_PASSWORD             | WAF Admin UI password

### Microservices / Repos <a name="microservices-repos"></a>

These are the microservices used as part of ROTM:

* [File-vault](https://github.com/UKHomeOffice/file-vault) - A simple REST service that allows POSTing a file to an S3 bucket.
* [HOF Docker HAproxy](https://github.com/UKHomeOffice/hof-docker-haproxy) - Global rate limiting with stick-table sync 
* [HOF Forms WAF](https://github.com/UKHomeOffice/hof-forms-waf) - A comprehensive, multi-layer spam protection system for web forms using OpenResty (Lua) for intelligent form analysis. Features a modern 
React-based Admin UI for real-time configuration management.
