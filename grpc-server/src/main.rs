#![warn(rust_2018_idioms)]
#![recursion_limit = "1024"]

#[macro_use]
extern crate log;

use hubble2::config::config;
use hubble2::grpc;

const NS: &str = "main";

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    pretty_env_logger::formatted_timed_builder().format_timestamp_nanos().filter(None, log::LevelFilter::Info).init();

    if let Err(e) = grpc::start_grpc_server(config.grpc.port).await {
        error!(target: NS, "Failed to start grpc server at port {:?}: {:?}", config.grpc.port, e);
        std::process::exit(1);
    };

    Ok(())
}
