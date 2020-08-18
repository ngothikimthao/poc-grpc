var GRPC_SERVER_PORT = 5004;
var {StartVideoStreamRequest, HelloRequest, RepeatHelloRequest, TokenRequest} = require('./kobiton_pb.js');
var {KobitonRpcClient} = require('./kobiton_grpc_web_pb.js');
const grpc = {};
grpc.web = require('grpc-web');

window.onload = function () {
  console.log("window.onload");
  // Prepare VIDEO
  var MIME_CODEC = 'video/mp4; codecs="avc1.42c028"';
  var sourceBuffer;
  var isMediaSourceReady = false;
  var isFirstFrameLoaded = false;
  var nFrames = 0;
  var queue = [];
  var videoFirstFrameReceiveTime = null;
  var client = new KobitonRpcClient(`http:\/\/localhost:${GRPC_SERVER_PORT}`, null, null);

  const form = document.getElementById("formHello");
  form.addEventListener("submit", e => {
    const name = e.target.name.value;
    if(name) {
      gRPCHello(name);
      gRPCStreamRespon(name);
    }
    else {
      document.getElementById("error-message").innerText = "Please enter your name!";
    }
    e.preventDefault();
  })

  // GRPC hello
  const gRPCHello = (name) => {
    var node = document.createElement("ul");
    var singleHelloRequest = new HelloRequest();
    singleHelloRequest.setName(name);
  
    client.sayHello(singleHelloRequest, {}, (err, response) => {
      console.log("response", response);
      if (err) {
        console.log(`Unexpected error for sayHello: code = ${err.code}` + `, message = "${err.message}"`);
      } else {
        var nodeChild = document.createElement("li");
        var textnode = document.createTextNode(response.getMessage());
        nodeChild.appendChild(textnode);
        node.appendChild(nodeChild);
        console.log(response.getMessage());
      }
      document.getElementById("hello").appendChild(node);
    });
  }

  // GRPC stream response
  const gRPCStreamRespon = (name) => {
    var node = document.createElement("ul");

    var streamHelloRequest = new RepeatHelloRequest();
    streamHelloRequest.setName(name);
    streamHelloRequest.setCount(5);
  
    var streamHello = client.sayRepeatHello(streamHelloRequest);
    streamHello.on('data', (response) => {
      var nodeChild = document.createElement("li");
      var textnode = document.createTextNode(response.getMessage());
      nodeChild.appendChild(textnode)
      node.appendChild(nodeChild);
      console.log(response.getMessage());
    });
    document.getElementById("hello-repeat").appendChild(node);
    streamHello.on('error', (err) => {
      console.log(`Unexpected stream error: code = ${err.code}` + `, message = "${err.message}"`);
    });
  }

  // Media source & video
  var mediaSource = new MediaSource();
  console.log("mediaSource.readyState", mediaSource.readyState);
  mediaSource.addEventListener("sourceopen", function () {
    console.log("mediaSource.readyState", mediaSource.readyState);
    sourceBuffer = mediaSource.addSourceBuffer(MIME_CODEC);
    isMediaSourceReady = true;
  });

  var video = document.querySelector("video");
  video.addEventListener("loadedmetadata", function () {
    if (video.readyState > 0) {
      video.play();
      console.log("Video play");

      video.onplay = () => {
        if (video.buffered.length > 0) {
          const bufferedTime = video.buffered.end(video.buffered.length - 1);
          const currentTime = video.currentTime;
          if (currentTime < bufferedTime) {
            video.currentTime = bufferedTime;
          }
        }
      };
    }
  });

  video.addEventListener("timeupdate", function () {
    if (video.buffered.length > 0) {
      const bufferedTime = video.buffered.end(video.buffered.length - 1);
      const currentTime = video.currentTime;
      if (currentTime < bufferedTime) {
        video.currentTime = bufferedTime;
      }
    }
  });
  video.src = URL.createObjectURL(mediaSource);

  // GRPC streaming
  var request = new StartVideoStreamRequest();
  var stream = client.startVideoStream(request, {});

  // Read data
  stream.on('data', function(data) {
    // console.log('>>> received', data.getData())
    var rawBytes = data.getData();

    if (nFrames == 0) {
      console.log("First msg");
    }
    nFrames++;

    // First frame 0, 0, 0, 0?
    var isNewFrame0000 =
      rawBytes.length === 4 && rawBytes.reduce((a, b) => a + b, 0) == 0;

    if (isNewFrame0000) {
      if (isFirstFrameLoaded === false) {
        isFirstFrameLoaded = true;
      }
      this._queue = [];
      return;
    }

    if (isMediaSourceReady && isFirstFrameLoaded) {
      if (!videoFirstFrameReceiveTime) {
        videoFirstFrameReceiveTime = new Date();
      }
      queue.push(rawBytes);
      if (!sourceBuffer.updating) {
        var nBytes = 0;
        for (let item of queue) {
          nBytes += item.length;
        }
        var allBytes = new Uint8Array(nBytes);
        var index = 0;
        for (let item of queue) {
          allBytes.set(item, index);
          index += item.length;
        }
        sourceBuffer.appendBuffer(allBytes);
        queue = [];
      }
    }
  });
  stream.on('status', function(status) {
    console.log('[grpc] status', status);
  });
  stream.on('error', function(error) {
    console.log('[grpc] error', error);
  });
  stream.on('end', function() {
    console.log('[grpc] end');
  });
};
