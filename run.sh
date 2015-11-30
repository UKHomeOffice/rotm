#!/bin/bash

rtm_node_process_id=$(pidof rtm)
if [ -z rtm_node_process_id ]
then npm stop
fi
  
if [ "$NODE_ENV" = "development" ]
  then npm run dev;
elif [ "$NODE_ENV" = "so-ci" ]
  then SITEROOT=/rotm npm start;
fi

