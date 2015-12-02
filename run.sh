#!/bin/bash

if pidof -o %PPID -x "rtm">/dev/null; then
   echo "stopping pid $$"
   npm stop
fi

if [ "$NODE_ENV" = "development" ]
then echo "starting the service"
     npm run dev
elif [ "$NODE_ENV" = "nginx-dev" ]
then echo "starting the service"
     SITEROOT=/rotm nohup nodemon -e html,js,json --debug . > /dev/null 2>&1 &
     exit 0
elif [ "$NODE_ENV" = "so-ci" ]
then echo "starting service"
     SITEROOT=/rotm nohup npm start > /dev/null 2>&1 &
     exit 0
fi


