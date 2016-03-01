#!/bin/bash

set -e

REDIS_HOST=${REDIS_HOST:-localhost}
REDIS_HOST=${REDIS_HOST:-127.0.0.1}
REDIS_PORT=${REDIS_PORT:-6379}
SITEROOT=${SITEROOT:-/rotm}
GA_TAG_ID=${GA_TAG_ID}
SERVE_STATIC=${SERVE_STATIC}
echo "starting the service"

if [ "${SERVE_STATIC}" == "" ]; then
  cp -r /app/public/* /public/
fi
SECURE_PROTOCOL=true npm start


