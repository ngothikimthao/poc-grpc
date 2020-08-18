#!/usr/bin/env bash
protoc -I=../proto kobiton.proto \
  --js_out=import_style=commonjs:. \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.

npx webpack client.js