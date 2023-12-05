#! /bin/bash
set -e

export INGRESS_INTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-internal-annotations.yaml
export INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/ingress-external-annotations.yaml
export CONFIGMAP_VALUES=$HOF_CONFIG/configmap-values.yaml
export NGINX_SETTINGS=$HOF_CONFIG/nginx-settings.yaml
export FILEVAULT_NGINX_SETTINGS=$HOF_CONFIG/filevault-nginx-settings.yaml
export FILEVAULT_INGRESS_EXTERNAL_ANNOTATIONS=$HOF_CONFIG/filevault-ingress-external-annotations.yaml

kd='kd --insecure-skip-tls-verify --timeout 10m --check-interval 10s'

if [[ $1 == 'tear_down' ]]; then
  export KUBE_NAMESPACE=$BRANCH_ENV
  export DRONE_SOURCE_BRANCH=$(cat /root/.dockersock/branch_name.txt)

  $kd --delete -f kube/configmaps/configmap.yml
  $kd --delete -f kube/redis -f kube/file-vault -f kube/app
  echo "Torn Down UAT Branch - $APP_NAME-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
  exit 0
fi

export KUBE_NAMESPACE=$1
export DRONE_SOURCE_BRANCH=$(echo $DRONE_SOURCE_BRANCH | tr '[:upper:]' '[:lower:]' | tr '/' '-')

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  export DISCOVERY_URL="https://acp-sso.notprod.acp.homeoffice.gov.uk/realms/rotm-dev"
  export REDIRECTION_URL="https://fv-${DRONE_SOURCE_BRANCH}.${BRANCH_ENV}.homeoffice.gov.uk"
  $kd -f kube/file-vault/file-vault-ingress.yml # deploy ingress first so file-vault can use its tls-secret in its keycloak certs
  $kd -f kube/configmaps -f kube/certs
  $kd -f kube/redis -f kube/file-vault -f kube/app
elif [[ ${KUBE_NAMESPACE} == ${UAT_ENV} ]]; then
  export DISCOVERY_URL="https://acp-sso.notprod.acp.homeoffice.gov.uk/realms/rotm-dev"
  export REDIRECTION_URL="https://fv-uat.notprod.${APP_NAME}.homeoffice.gov.uk"
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps/configmap.yml -f kube/app/service.yml
  $kd -f kube/app/ingress-internal.yml -f kube/app/networkpolicy-internal.yml
  $kd -f kube/redis -f kube/file-vault -f kube/app/deployment.yml
elif [[ ${KUBE_NAMESPACE} == ${STG_ENV} ]]; then
  export DISCOVERY_URL="https://acp-sso.notprod.acp.homeoffice.gov.uk/realms/rotm-dev"
  export REDIRECTION_URL="https://fv-stg.prod.${APP_NAME}.homeoffice.gov.uk"
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps/configmap.yml  -f kube/app/service.yml
  $kd -f kube/app/ingress-internal.yml -f kube/app/networkpolicy-internal.yml
  $kd -f kube/redis -f kube/file-vault -f kube/app/deployment.yml
elif [[ ${KUBE_NAMESPACE} == ${PROD_ENV} ]]; then
  export DISCOVERY_URL="https://sso.digital.homeoffice.gov.uk/auth/realms/rotm"
  export REDIRECTION_URL="https://fv-prod.${APP_NAME}.homeoffice.gov.uk"
  # NOTE: The discovery URL for prod will also be changed once ACP have upgraded our keycloak production realm
  $kd -f kube/file-vault/file-vault-ingress.yml
  $kd -f kube/configmaps/configmap.yml  -f kube/app/service.yml
  $kd -f kube/app/ingress-external.yml -f kube/app/networkpolicy-external.yml
  $kd -f kube/redis -f kube/file-vault -f kube/app/deployment.yml
fi

sleep $READY_FOR_TEST_DELAY

if [[ ${KUBE_NAMESPACE} == ${BRANCH_ENV} ]]; then
  echo "UAT Branch - $APP_NAME-$DRONE_SOURCE_BRANCH.internal.$BRANCH_ENV.homeoffice.gov.uk"
fi
