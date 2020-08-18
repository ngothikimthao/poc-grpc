#!/usr/bin/env bash

docker build -t grpc-proxy .
docker run -d -p 5004:5004 -p 9901:9901 grpc-proxy
nc -vz localhost 5004
