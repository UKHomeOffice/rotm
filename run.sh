#!/bin/bash

if pidof -o %PPID -x "rtm">/dev/null; then
   echo "stopping pid $$"
   npm stop
fi

if [ "$NODE_ENV" = "development" ] #use this for local machine dev on port 8080
then echo "starting the service"
     CONFI_FILE=config_dev.yml npm run dev
elif [ "$NODE_ENV" = "nginx-dev" ] #use this on local machine with nginx pointing at localhost/rotm 
then echo "starting the service"
     SITEROOT=/rotm nohup nodemon -e html,js,json --debug . > /dev/null 2>&1 &
elif [ "$NODE_ENV" = "so-ci" ] #use this on ci.so
then echo "starting service"
     SITEROOT=/rotm GA_TAG_ID=UA-70918942-1 node /var/www/rotm/app.js
fi


