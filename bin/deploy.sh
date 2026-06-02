#! /bin/bash
set -e

export INGRESS_INTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-internal-annotations.yaml
export INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-external-annotations.yaml
export ADMIN_UI_INGRESS_INTERNAL_ANNOTATIONS=$HOF_CONFIG/admin-ui-ingress-internal-annotations.yaml
export ADMIN_UI_INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/admin-ui-ingress-external-annotations.yaml
export CONFIGMAP_VALUES=$HOF_CONFIG/configmap-values.yaml
export NGINX_SETTINGS=$HOF_CONFIG/nginx-settings.yaml
export FILEVAULT_NGINX_SETTINGS=$HOF_CONFIG/filevault-nginx-settings.yaml
export FILEVAULT_INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/filevault-ingress-external-annotations.yaml
export HA_PROXY_SETTINGS=$HOF_CONFIG/ha-proxy-settings.yaml
export REAL_APP_NAME=$APP_NAME
export OPENRESTY_SETTINGS=$HOF_CONFIG/openresty-settings.yaml

kd='kd --insecure-skip-tls-verify --timeout 10m --check-interval 10s'

sanitize_branch_name() {
  local raw_branch="$1"
  local sanitized_branch

  sanitized_branch=$(echo "$raw_branch" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g')

  if [[ -z "$sanitized_branch" ]]; then
    sanitized_branch='branch'
  fi

  # Keep branch slug short so generated Kubernetes resource names remain within DNS label limits.
  sanitized_branch="${sanitized_branch:0:40}"
  sanitized_branch=$(echo "$sanitized_branch" | sed -E 's/-+$//')

  if [[ -z "$sanitized_branch" ]]; then
    sanitized_branch='branch'
  fi

  echo "$sanitized_branch"
}

deploy_redis() {
  # Only STG/PROD create a PVC; other envs stay non-persistent.

  if [[ "${REDIS_PERSISTENCE_ENABLED}" == "true" && -z "${REDIS_PERSISTENCE_EXISTING_CLAIM}" ]]; then
    $kd -f kube/redis/redis-persistent-volume-claim.yml
  fi

  $kd -f kube/redis/redis-service.yml \
    -f kube/redis/redis-network-policy.yml \
    -f kube/redis/redis-deployment.yml
}

delete_redis() {
  if [[ "${REDIS_PERSISTENCE_ENABLED}" == "true" && -z "${REDIS_PERSISTENCE_EXISTING_CLAIM}" ]]; then
    $kd --delete -f kube/redis/redis-persistent-volume-claim.yml
  fi

  $kd --delete -f kube/redis/redis-service.yml \
    -f kube/redis/redis-network-policy.yml \
    -f kube/redis/redis-deployment.yml
}

if [[ $1 == 'tear_down' ]]; then
  export KUBE_NAMESPACE=$BRANCH_ENV
  export DRONE_SOURCE_BRANCH=$(sanitize_branch_name "$(cat /root/.dockersock/branch_name.txt)")

  export REDIS_PERSISTENCE_ENABLED=$(echo "${REDIS_PERSISTENCE_ENABLED:-true}" | tr '[:upper:]' '[:lower:]')
  export REDIS_PERSISTENCE_ACCESS_MODES=${REDIS_PERSISTENCE_ACCESS_MODES:-ReadWriteOnce}
  export REDIS_PERSISTENCE_STORAGE_CLASS=${REDIS_PERSISTENCE_STORAGE_CLASS:-gp2-encrypted-eu-west-2b}
  export REDIS_PERSISTENCE_EXISTING_CLAIM=${REDIS_PERSISTENCE_EXISTING_CLAIM:-}
  export REDIS_PERSISTENCE_ANNOTATIONS_FILE=${REDIS_PERSISTENCE_ANNOTATIONS_FILE:-}

  if [[ -z "${REDIS_PERSISTENCE_SIZE}" ]]; then
    export REDIS_PERSISTENCE_SIZE=1Gi
  fi

  $kd --delete -f kube/configmaps/configmap.yml
  delete_redis
  $kd --delete -f kube/file-vault -f kube/app -f kube/ui-redis/ui-redis-statefulset.yml -f kube/ui-redis/ui-redis-service.yml -f kube/ui-redis/ui-redis-pvc.yml -f kube/ui-redis/ui-redis-network-policy.yml -f kube/ui-redis/ui-redis-configmap.yml -f kube/openresty
  $kd --delete -f kube/ha-proxy/ha-proxy-statefulset.yml -f kube/ha-proxy/ha-proxy-public-service.yml -f kube/ha-proxy/ha-proxy-peer-service.yml -f kube/ha-proxy/ha-proxy-network-policy.yml -f kube/ha-proxy/ha-proxy-configmap.yml
  echo "Torn Down Branch - $APP_NAME-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  exit 0
fi

export KUBE_NAMESPACE=$1
export DRONE_SOURCE_BRANCH=$(sanitize_branch_name "${DRONE_SOURCE_BRANCH}")
export REDIS_PERSISTENCE_ENABLED=$(echo "${REDIS_PERSISTENCE_ENABLED:-true}" | tr '[:upper:]' '[:lower:]')
export REDIS_PERSISTENCE_ACCESS_MODES=${REDIS_PERSISTENCE_ACCESS_MODES:-ReadWriteOnce}
export REDIS_PERSISTENCE_STORAGE_CLASS=${REDIS_PERSISTENCE_STORAGE_CLASS:-gp2-encrypted-eu-west-2b}
export REDIS_PERSISTENCE_EXISTING_CLAIM=${REDIS_PERSISTENCE_EXISTING_CLAIM:-}
export REDIS_PERSISTENCE_ANNOTATIONS_FILE=${REDIS_PERSISTENCE_ANNOTATIONS_FILE:-}

# Redis PVC is STG/PROD only, with fixed sizes.
if [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  export REDIS_PERSISTENCE_ENABLED=true
  export REDIS_PERSISTENCE_SIZE=10Gi
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  export REDIS_PERSISTENCE_ENABLED=true
  export REDIS_PERSISTENCE_SIZE=1Gi
else
  export REDIS_PERSISTENCE_ENABLED=false
fi

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  export REAL_APP_NAME="$APP_NAME-$DRONE_SOURCE_BRANCH"

  $kd -f kube/file-vault/file-vault-ingress.yml # deploy ingress first so file-vault can use its tls-secret in its keycloak certs
  $kd -f kube/configmaps -f kube/certs
  deploy_redis
  $kd -f kube/file-vault -f kube/app
  $kd -f kube/ui-redis
  $kd -f kube/openresty/admin-ui-deployment.yml -f kube/openresty/admin-ui-ingress-internal.yml -f kube/openresty/admin-ui-network-policy.yml -f kube/openresty/admin-ui-service.yml -f kube/openresty/openresty-configmap.yml -f kube/openresty/openresty-deployment.yml -f kube/openresty/openresty-network-policy.yml -f kube/openresty/openresty-service.yml
  $kd -f kube/ha-proxy
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps/configmap.yml -f kube/app/service.yml
  $kd -f kube/app/ingress-internal.yml -f kube/app/ingress-external.yml -f kube/app/networkpolicy-internal.yml -f kube/app/networkpolicy-external.yml
  deploy_redis
  $kd -f kube/file-vault -f kube/app/deployment.yml
  $kd -f kube/ui-redis
  $kd -f kube/openresty/admin-ui-deployment.yml -f kube/openresty/admin-ui-ingress-internal.yml -f kube/openresty/admin-ui-network-policy.yml -f kube/openresty/admin-ui-service.yml -f kube/openresty/openresty-configmap.yml -f kube/openresty/openresty-deployment.yml -f kube/openresty/openresty-network-policy.yml -f kube/openresty/openresty-service.yml
  $kd -f kube/ha-proxy
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps/configmap.yml  -f kube/app/service.yml
  $kd -f kube/app/ingress-internal.yml -f kube/app/ingress-external.yml -f kube/app/networkpolicy-internal.yml -f kube/app/networkpolicy-external.yml
  deploy_redis
  $kd -f kube/file-vault
  $kd -f kube/ui-redis
  $kd -f kube/openresty/admin-ui-deployment.yml -f kube/openresty/admin-ui-ingress-internal.yml -f kube/openresty/admin-ui-network-policy.yml -f kube/openresty/admin-ui-service.yml -f kube/openresty/openresty-configmap.yml -f kube/openresty/openresty-deployment.yml -f kube/openresty/openresty-network-policy.yml -f kube/openresty/openresty-service.yml
  $kd -f kube/ha-proxy
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps/configmap.yml  -f kube/app/service.yml
  $kd -f kube/app/ingress-external.yml -f kube/app/networkpolicy-external.yml
  deploy_redis
  $kd -f kube/file-vault
  $kd -f kube/ui-redis
  $kd -f kube/openresty/admin-ui-deployment.yml -f kube/openresty/admin-ui-ingress-external.yml -f kube/openresty/admin-ui-network-policy.yml -f kube/openresty/admin-ui-service.yml -f kube/openresty/openresty-configmap.yml -f kube/openresty/openresty-deployment.yml -f kube/openresty/openresty-network-policy.yml -f kube/openresty/openresty-service.yml
  $kd -f kube/ha-proxy
fi

sleep $READY_FOR_TEST_DELAY

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  echo "Branch - $APP_NAME-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  echo "WAF Admin UI - waf-admin-ui-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
fi
