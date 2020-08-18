use std::net::SocketAddr;
use std::time::Duration;

use futures_util::StreamExt;
use tokio::fs::File;
use tokio::io::BufReader;
use tokio::sync::mpsc;
use tokio::time::delay_for;
use tokio_util::codec::LengthDelimitedCodec;

use tonic::{transport::Server, Request, Response, Status};
use kobiton_rpc::{HelloRequest, HelloReply};
use kobiton_rpc::kobiton_rpc_server::KobitonRpc;


use crate::error::KobitonError;

pub mod kobiton_rpc {
    tonic::include_proto!("kobiton_rpc");
}

const NS: &str = "grpc";

#[derive(Debug)]
pub struct KobitonRpcImpl {}

impl KobitonRpcImpl {}

#[tonic::async_trait]
impl KobitonRpc for KobitonRpcImpl {
    type StartVideoStreamStream = mpsc::Receiver<Result<kobiton_rpc::VideoFrame, tonic::Status>>;
    async fn start_video_stream(&self, _request: tonic::Request<kobiton_rpc::StartVideoStreamRequest>) -> Result<tonic::Response<Self::StartVideoStreamStream>, tonic::Status> {
        let (data_tx, data_rx) = mpsc::channel::<Result<kobiton_rpc::VideoFrame, tonic::Status>>(128);
        tokio::spawn(async move {
            if let Err(e) = stream_video(data_tx).await {
                error!("stream_video failed. Error: {:?}", e);
            }
        });
        Ok(Response::new(data_rx))
    }

    async fn say_hello(&self, _request:Request<HelloRequest>) -> Result<Response<HelloReply>, Status>{
        Ok(Response::new(HelloReply {
          message:format!("Your netwwork has been successfully connected!"),
        }))
    }  
}

async fn stream_video(mut data_tx: mpsc::Sender<Result<kobiton_rpc::VideoFrame, tonic::Status>>) -> Result<(), KobitonError> {
    let file = File::open("data/video_from_desktop.bin").await?;
    let reader = BufReader::with_capacity(1000000, file);
    let mut stream = LengthDelimitedCodec::builder().little_endian().new_read(reader);
    loop {
        match stream.next().await {
            Some(Ok(data)) => {
                if let Err(e) = data_tx.send(Ok(kobiton_rpc::VideoFrame { data: data.to_vec() })).await {
                    error!("Fail to stream video. Error: {:?}", e);
                    break;
                }
                delay_for(Duration::from_millis(60)).await;
            }
            Some(Err(e)) => {
                error!("Fail to read next video frame. Error: {:?}", e);
                break;
            }
            None => {
                info!("video_from_desktop.bin --> EOF");
                break;
            }
        }
    }
    Ok(())
}

pub async fn start_grpc_server(port: u16) -> Result<(), KobitonError> {
    let addr: SocketAddr = format!("0.0.0.0:{}", port).parse().unwrap();
    let grpc_server = kobiton_rpc::kobiton_rpc_server::KobitonRpcServer::new(KobitonRpcImpl {});
    info!(target: NS, "Start GRPC server at {}", addr.to_string());
    Server::builder().add_service(grpc_server).serve(addr).await?;
    Ok(())
}

