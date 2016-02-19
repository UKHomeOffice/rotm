#!/usr/bin/env bash

#docker-compose surfaces REDIS_PORT and MAILDEV_PORT as fully qualified tcp addresses
REDISADDR=$(echo $REDIS_PORT | awk -F/ '{print $3}' )
REDIS=($(echo $REDISADDR | awk -F: '{print $1} {print $2}' ))
MAILDEVADDR=$(echo $MAILDEV_PORT | awk -F/ '{print $3}' )
MAILDEV=($(echo $MAILDEVADDR | awk -F: '{print $1} {print $2}' ))

SMTP_HOST=${MAILDEV[0]} SMTP_PORT=${MAILDEV[1]} REDIS_HOST=${REDIS[0]} REDIS_PORT=${REDIS[1]} nodemon -e html,js,json .
