# Setup

3 components:
## HTTP proxy:
- Start docker
- Open folder grpc-proxy, run `start.sh`

## GRPC server (Rust)
- Install Rust
- Open folder grpc-server, run `cargo run`

## Portal (NodeJS)
- Open portal
- Run `build.sh`
- Run `yarn install`
- Run `./app.js`
- Open browser `localhost:8081` to watch video
