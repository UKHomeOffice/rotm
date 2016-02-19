#!/usr/bin/env bash
set -e

BUILD_HOME_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
IMAGE="rotm-app"
REGISTRY="${REGISTRY:-quay.io}"
VERSION=v0.1.${BUILD_VERSION:-0-dev}
TAG=${REGISTRY}/ukhomeofficedigital/${IMAGE}:${VERSION}
GA_TAG_ID=UA-70918942-1
MAILCATCHER_HOST=rotm_mailcatcher
APP_HOST=${IMAGE}
SMTP_PORT=1025
ACCEPTANCE_TAG=rotm_accept

cd ${BUILD_HOME_DIR}
mkdir -p ${PWD}/tmp

# Build container...
docker build -t ${TAG} .

echo "Starting Integration Mailcatcher Instance..."
docker stop ${MAILCATCHER_HOST} 2>/dev/null || true
docker rm ${MAILCATCHER_HOST} 2>/dev/null || true
docker stop ${APP_HOST} 2>/dev/null || true
docker rm ${APP_HOST} 2>/dev/null || true
docker run -d --name=${MAILCATCHER_HOST} -P \
  quay.io/ukhomeofficedigital/mailcatcher:v0.1.1

echo "Starting docker build with params:'$@'..."
docker run --name=${APP_HOST} -d  \
  --link ${MAILCATCHER_HOST}:mailcatcher \
  -e BUILD_NUMBER=${BUILD_NUMBER} \
  -e "SMTP_HOST=${MAILCATCHER_HOST}" \
  -e "SMTP_PORT=${SMTP_PORT}" \
  ${TAG} \
  $@

# Acceptance / integration tests...
CONFIG_FILE=config_ci_build.yml
echo "rtm_dev_host: 'http://${APP_HOST}/report-terrorism'" \
    > ${BUILD_HOME_DIR}/acceptance_tests/features/support/${CONFIG_TMP_FILE}
(
  cd ${BUILD_HOME_DIR}/acceptance_tests
  docker build -t ${ACCEPTANCE_TAG} .
  if docker run -i --rm=true \
       --link ${APP_HOST}:${APP_HOST} \
       -e CONFIG_FILE \
       ${ACCEPTANCE_TAG}
  then
    ok=0
  else
    ok=1
  fi
)

# Always tidy up...
docker stop ${MAILCATCHER_HOST} || true
docker stop ${APP_HOST} || true

if [ ${ok} -ne 0 ]; then
    echo "Failed build"
    exit 1
fi
mkdir -p ${BUILD_HOME_DIR}/artefacts
echo ${VERSION}>artefacts/version
${DOCKER_CMD} || ${DOCKER_CMD}
if [ "${BUILD_NUMBER}" != "" ]; then
  docker push ${TAG}
fi
