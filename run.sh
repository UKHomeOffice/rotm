#!/bin/bash

if [ "$NODE_ENV" = "development" ] #use this for local machine dev on port 8080
then echo "starting the service"
     if pidof -o %PPID -x "rtm">/dev/null; then
       echo "stopping pid $$"
       npm stop
     fi

     CONFIG_FILE=config_dev.yml npm run dev
     
elif [ "$NODE_ENV" = "docker" ] #use this for dockerised local machine
then echo "starting the service"
     nodemon -e html,js,json .


     SITEROOT=/rotm nodemon -e html,js,json --debug .

elif [ "$NODE_ENV" = "so-ci" ] #use this on ci.so
then echo "starting service"
     SITEROOT=/rotm GA_TAG_ID=UA-70918942-1 node /var/www/rotm/app.js
fi


