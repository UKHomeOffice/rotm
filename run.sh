#!/bin/bash

cp -r /app/public/* /public/

su nodejs -c 'exec node app.js'

