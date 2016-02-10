#!/bin/bash

if [ "$NODE_ENV" = "development" ] #use this for local machine dev on port 8080
then echo "starting the service"
     if pidof -o %PPID -x "rtm">/dev/null; then
       echo "stopping pid $$"
       npm stop
     fi

     CONFIG_FILE=config_dev.yml npm run dev
     
elif [ "$NODE_ENV" = "docker-compose" ] #use this for dockerised local machine
then echo "starting the service"

     #docker-compose surfaces REDIS_PORT and MAILDEV_PORT as fully qualified tcp addresses
     REDISADDR=$(echo $REDIS_PORT | awk -F/ '{print $3}' )
     REDIS=($(echo $REDISADDR | awk -F: '{print $1} {print $2}' ))
     MAILDEVADDR=$(echo $MAILDEV_PORT | awk -F/ '{print $3}' )
     MAILDEV=($(echo $MAILDEVADDR | awk -F: '{print $1} {print $2}' ))
     
     SMTP_HOST=${MAILDEV[0]} SMTP_PORT=${MAILDEV[1]} REDIS_HOST=${REDIS[0]} REDIS_PORT=${REDIS[1]} nodemon -e html,js,json .

elif [ "$NODE_ENV" = "so-ci" ] #use this on ci.so
then echo "starting service"
     SITEROOT=/rotm GA_TAG_ID=UA-70918942-1 node /var/www/rotm/app.js
fi


