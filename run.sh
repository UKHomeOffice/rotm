#!/bin/bash

if [ "$NODE_ENV" = "development" ]
  then npm run dev;
elif [ "$NODE_ENV" = "so-ci" ]
  then SITEROOT=/rotm npm start;
fi

