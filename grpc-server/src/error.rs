use thiserror::Error;

#[derive(Error, Debug)]
pub enum KobitonError {
    #[error("I/O error")]
    Io(#[from] std::io::Error),
    #[error("GRPC transport error")]
    GRPC(#[from] tonic::transport::Error),
}
