#!/bin/sh
PORT=3001
PORTS=`lsof -t -i:$PORT`
if [ "${PORTS:-0}" != 0 ]; then
    kill -9 $(lsof -t -i:"$PORT")
    echo "[i] Killed port localhost:$PORT"
fi
PORTSAGAIN=`lsof -t -i:$PORT`
if [ "${PORTSAGAIN:-0}" == 0 ]; then
    echo "[i] Localhost:$PORT is closed"
    echo "[i] Opening app with nodemon on localhost:$PORT"
    nodemon ./lib/app.js
fi
