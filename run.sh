#!/bin/bash

if [ "$NODE_ENV" = "ci" ]
then echo "starting service"
  SITEROOT=/rtm
fi

exec npm start
