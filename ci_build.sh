#!/usr/bin/env bash
set -e

BUILD_HOME_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
IMAGE="rotm-app"
REGISTRY="${REGISTRY:-quay.io}"
VERSION=v0.1.${BUILD_NUMBER:-0-dev}
TAG=${REGISTRY}/ukhomeofficedigital/${IMAGE}:${VERSION}
GA_TAG_ID=UA-70918942-1
MAILCATCHER_HOST=rotm_mailcatcher
SMTP_PORT=1025
REDIS_HOST=rotm-redis
REDIS_PORT=6379
APP_HOST=${IMAGE}
APP_PORT=8080
ACCEPTANCE_TAG=rotm_accept

function cleanup() {
  container_id=$1

  docker stop ${container_id} 2>/dev/null || true
  docker rm ${container_id} 2>/dev/null || true
}

cd ${BUILD_HOME_DIR}
mkdir -p ${PWD}/tmp

# Build container...
echo "Building app..."
echo "==============="
docker build -t ${TAG} .

echo "Cleaning up any old containers..."
cleanup ${MAILCATCHER_HOST}
cleanup ${APP_HOST}
cleanup ${REDIS_HOST}
echo "Starting Integration Mailcatcher Instance..."
docker run -d --name=${MAILCATCHER_HOST} -P \
  quay.io/ukhomeofficedigital/mailcatcher:v0.1.1

echo "Starting Integration Redis Instance..."
docker run -d --name=${REDIS_HOST} -P \
  quay.io/ukhomeofficedigital/redis:v0.0.1

echo "Building app container: ${TAG}"
docker run -d  --name=${APP_HOST} -P \
  --link ${MAILCATCHER_HOST}:${MAILCATCHER_HOST} \
  --link ${REDIS_HOST}:${REDIS_HOST} \
  -e "BUILD_NUMBER=${BUILD_NUMBER}" \
  -e "SMTP_HOST=${MAILCATCHER_HOST}" \
  -e "SMTP_PORT=${SMTP_PORT}" \
  -e "REDIS_HOST=${REDIS_HOST}" \
  -e "REDIS_PORT=${REDIS_PORT}" \
  -e "NODE_ENV=ci-build" \
  -v /tmp/${IMAGE}:/app/$HOME/node_modules \
  ${TAG}

# Acceptance / integration tests...
CONFIG_FILE=config_ci_build.yml
echo "rtm_dev_host: 'http://${APP_HOST}:8080/report-terrorism'" \
    > ${BUILD_HOME_DIR}/acceptance_tests/features/support/${CONFIG_FILE}
echo "Running acceptance tests container..."
cd ${BUILD_HOME_DIR}/acceptance_tests
docker build -t ${ACCEPTANCE_TAG} .
echo docker run -i --rm=true \
     --link ${APP_HOST}:${APP_HOST} \
     -e "CONFIG_FILE=${CONFIG_FILE}" \
     ${ACCEPTANCE_TAG}

# Pause before running tests
sleep 10
if docker run -i --rm=true \
     --link ${APP_HOST}:${APP_HOST} \
     -e "CONFIG_FILE=${CONFIG_FILE}" \
     ${ACCEPTANCE_TAG} ; then
  ok=0
else
  echo "Application logs:"
  #docker logs ${APP_HOST}
  ok=1
fi
cd -

# Always tidy up...
#docker stop ${MAILCATCHER_HOST} || true
#docker stop ${APP_HOST} || true
#docker stop ${REDIS_HOST} || true

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
