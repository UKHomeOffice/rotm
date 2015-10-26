#!/bin/bash

if [ ${DOCKER_COMPOSE} ]
  then /usr/sbin/nginx -c /etc/nginx/nginx-local-dev.conf;
  else
    if [[ -d /public ]]
      then chmod 0755 /public
    fi

    /usr/sbin/nginx -c /etc/nginx/nginx.conf
fi

