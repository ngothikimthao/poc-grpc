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
    var singleHelloRequest = new HelloRequest();   

    client.sayHello(singleHelloRequest, {}, (err, response) => {
      if (err) {
        document.getElementById("error").style.padding = "10px";
        document.getElementById("success-message").innerText = "";
        document.getElementById("error-message").innerText = `Error message: ${err.message}`;
          console.log(`Unexpected error for sayHello: code = ${err.code}` + `, message = "${err.message}"`);
      } else {
        document.getElementById("success").style.padding = "10px";
        document.getElementById("success-message").innerText = "Success message: " + response.getMessage();
        document.getElementById("error-message").innerText = "";
        console.log(response.getMessage());
      }
    });

  // GRPC streaming
  var request = new StartVideoStreamRequest();
  var stream = client.startVideoStream(request, {});

  // Read data
  stream.on('data', function(data) {
    document.getElementById("videoStream").style.display="block";
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
    document.getElementById("videoStream").style.display="none";
    console.log('[grpc] error', error);
  });
  stream.on('end', function() {
    console.log('[grpc] end');
  });

    e.preventDefault();
  })

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


};

