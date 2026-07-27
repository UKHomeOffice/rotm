#! /bin/bash
set -e

export KUBE_NAMESPACE=$1
export IGNORE_NETPOL=("acp-deny-all")
export IGNORE_CONFIGMAP=("bundle")

export kubectl="kubectl --insecure-skip-tls-verify --server=$KUBE_SERVER --namespace=$KUBE_NAMESPACE --token=$KUBE_TOKEN"

$kubectl delete --all deploy
$kubectl delete --all statefulset
$kubectl delete --all svc
$kubectl delete --all ingress

for each in $($kubectl get netpol -o jsonpath="{.items[*].metadata.name}");
do
  if [[ ! " ${IGNORE_NETPOL[@]} " =~ " ${each} " ]]; then
    $kubectl delete netpol "$each"
  fi
done

for each in $($kubectl get configmap -o jsonpath="{.items[*].metadata.name}");
do
  if [[ ! " ${IGNORE_CONFIGMAP[@]} " =~ " ${each} " ]]; then
    $kubectl delete configmap "$each"
  fi
done

for each in $($kubectl get pvc -o jsonpath="{.items[*].metadata.name}" 2>/dev/null);
do
  if [[ ${each} == redis-pvc* || ${each} == ui-redis-pvc* || ${each} == *ha-proxy* || ${each} == *haproxy* ]]; then
    $kubectl delete pvc "$each" --ignore-not-found=true
  fi
done
