#!/bin/bash

if [ ${DOCKER_COMPOSE} ]
  then npm run dev;
  else npm start;
fi

