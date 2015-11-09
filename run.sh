#!/bin/bash

if [ "$NODE_ENV" = "development" ]
  then npm run dev;
  else npm start;
fi

