#!/bin/bash

if [ "$NODE_ENV" = "ci" ]
then echo "starting service"
  SITEROOT=/rotm GA_TAG_ID=${GA_TAG_ID}
fi

cp -r /app/public/* /public/

su nodejs -c 'exec node app.js'

