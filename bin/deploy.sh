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

if [[ $1 == 'tear_down' ]]; then
  export KUBE_NAMESPACE=$BRANCH_ENV
  export DRONE_SOURCE_BRANCH=$(cat /root/.dockersock/branch_name.txt)
  export REDIS_PERSISTENCE_ENABLED="false"

  $kd --delete -f kube/configmaps/configmap.yml
  $kd --delete -f kube/redis -f kube/file-vault -f kube/app -f kube/ui-redis/ui-redis-statefulset.yml -f kube/ui-redis/ui-redis-service.yml -f kube/ui-redis/ui-redis-pvc.yml -f kube/ui-redis/ui-redis-network-policy.yml -f kube/ui-redis/ui-redis-configmap.yml -f kube/openresty
  $kd --delete -f kube/ha-proxy/ha-proxy-statefulset.yml -f kube/ha-proxy/ha-proxy-public-service.yml -f kube/ha-proxy/ha-proxy-peer-service.yml -f kube/ha-proxy/ha-proxy-network-policy.yml -f kube/ha-proxy/ha-proxy-configmap.yml
  echo "Torn Down Branch - $APP_NAME-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  exit 0
fi

export KUBE_NAMESPACE=$1
export DRONE_SOURCE_BRANCH=$(echo $DRONE_SOURCE_BRANCH | tr '[:upper:]' '[:lower:]' | tr '/' '-')

export kubectl="kubectl --insecure-skip-tls-verify --server=$KUBE_SERVER --namespace=$KUBE_NAMESPACE --token=$KUBE_TOKEN"

recreate_redis_pvc_if_image_changed() {
  if [[ "${REDIS_PERSISTENCE_ENABLED}" != "true" ]]; then
    return 0
  fi

  local deploy_name="redis"
  local selector="app=redis"

  if [[ "${KUBE_NAMESPACE}" == "${BRANCH_ENV}" ]]; then
    deploy_name="redis-${DRONE_SOURCE_BRANCH}"
    selector="app=redis-${DRONE_SOURCE_BRANCH}"
  fi

  local desired_image
  desired_image=$(grep -m1 'image:' kube/redis/redis-deployment.yml | awk '{print $2}')
  if [[ -z "${desired_image}" ]]; then
    echo "WARN: Could not determine desired Redis image; skipping image-change check"
    return 0
  fi

  local current_image
  current_image=$($kubectl get deploy "${deploy_name}" -o jsonpath='{.spec.template.spec.containers[?(@.name=="redis")].image}' 2>/dev/null || true)

  if [[ -n "${current_image}" && "${current_image}" != "${desired_image}" ]]; then
    echo "Redis image changed (${current_image} -> ${desired_image}); recreating deployment"
    $kubectl delete deploy "${deploy_name}" --ignore-not-found=true

    for _ in {1..60}; do
      if [[ -z "$($kubectl get pods -l "${selector}" -o name 2>/dev/null || true)" ]]; then
        break
      fi
      sleep 5
    done
  fi
}

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  export REAL_APP_NAME="$APP_NAME-$DRONE_SOURCE_BRANCH"

  $kd -f kube/file-vault/file-vault-ingress.yml # deploy ingress first so file-vault can use its tls-secret in its keycloak certs
  $kd -f kube/configmaps -f kube/certs

  recreate_redis_pvc_if_image_changed
  $kd -f kube/redis/redis-persistent-volume-claim.yml
  $kd -f kube/redis/redis-service.yml \
      -f kube/redis/redis-network-policy.yml \
      -f kube/redis/redis-deployment.yml \
      -f kube/file-vault \
      -f kube/app

  $kd -f kube/ui-redis
  $kd -f kube/openresty/admin-ui-deployment.yml -f kube/openresty/admin-ui-ingress-internal.yml -f kube/openresty/admin-ui-network-policy.yml -f kube/openresty/admin-ui-service.yml -f kube/openresty/openresty-configmap.yml -f kube/openresty/openresty-deployment.yml -f kube/openresty/openresty-network-policy.yml -f kube/openresty/openresty-service.yml
  $kd -f kube/ha-proxy
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps/configmap.yml -f kube/app/service.yml
  $kd -f kube/app/ingress-internal.yml -f kube/app/ingress-external.yml -f kube/app/networkpolicy-internal.yml -f kube/app/networkpolicy-external.yml
  $kd -f kube/redis -f kube/file-vault -f kube/app/deployment.yml
  $kd -f kube/ui-redis
  $kd -f kube/openresty/admin-ui-deployment.yml -f kube/openresty/admin-ui-ingress-internal.yml -f kube/openresty/admin-ui-network-policy.yml -f kube/openresty/admin-ui-service.yml -f kube/openresty/openresty-configmap.yml -f kube/openresty/openresty-deployment.yml -f kube/openresty/openresty-network-policy.yml -f kube/openresty/openresty-service.yml
  $kd -f kube/ha-proxy
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps/configmap.yml  -f kube/app/service.yml
  $kd -f kube/app/ingress-internal.yml -f kube/app/ingress-external.yml -f kube/app/networkpolicy-internal.yml -f kube/app/networkpolicy-external.yml
  recreate_redis_pvc_if_image_changed
  $kd -f kube/redis/redis-persistent-volume-claim.yml
  $kd -f kube/redis/redis-service.yml \
      -f kube/redis/redis-network-policy.yml \
      -f kube/redis/redis-deployment.yml \
      -f kube/file-vault \
      -f kube/app/deployment.yml
  $kd -f kube/ui-redis
  $kd -f kube/openresty/admin-ui-deployment.yml -f kube/openresty/admin-ui-ingress-internal.yml -f kube/openresty/admin-ui-network-policy.yml -f kube/openresty/admin-ui-service.yml -f kube/openresty/openresty-configmap.yml -f kube/openresty/openresty-deployment.yml -f kube/openresty/openresty-network-policy.yml -f kube/openresty/openresty-service.yml
  $kd -f kube/ha-proxy
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps/configmap.yml  -f kube/app/service.yml
  $kd -f kube/app/ingress-external.yml -f kube/app/networkpolicy-external.yml
  recreate_redis_pvc_if_image_changed
  $kd -f kube/redis/redis-persistent-volume-claim.yml
  $kd -f kube/redis/redis-service.yml \
      -f kube/redis/redis-network-policy.yml \
      -f kube/redis/redis-deployment.yml \
      -f kube/file-vault \
      -f kube/app/deployment.yml
  $kd -f kube/ui-redis
  $kd -f kube/openresty/admin-ui-deployment.yml -f kube/openresty/admin-ui-ingress-external.yml -f kube/openresty/admin-ui-network-policy.yml -f kube/openresty/admin-ui-service.yml -f kube/openresty/openresty-configmap.yml -f kube/openresty/openresty-deployment.yml -f kube/openresty/openresty-network-policy.yml -f kube/openresty/openresty-service.yml
  $kd -f kube/ha-proxy
fi

sleep $READY_FOR_TEST_DELAY

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  echo "Branch - $APP_NAME-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  echo "WAF Admin UI - waf-admin-ui-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
fi
