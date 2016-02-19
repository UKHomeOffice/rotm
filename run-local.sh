#!/usr/bin/env bash

if pidof -o %PPID -x "rtm">/dev/null; then
 echo "stopping pid $$"
 npm stop
fi

npm run dev
