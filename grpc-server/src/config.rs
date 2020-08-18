#[derive(Debug)]
pub struct Grpc {
    pub port: u16,
}

#[derive(Debug)]
pub struct Config {
    pub grpc: Grpc,
}

impl Default for Config {
    fn default() -> Self {
        Config {
            grpc: Grpc {
                port: std::env::var("KOBITON_DIRECTHUB_GRPC_PORT").unwrap_or_default().parse::<u16>().unwrap_or(5003),
            },
        }
    }
}

lazy_static! {
    pub static ref config: Config = Default::default();
}
