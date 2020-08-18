/**
 * @fileoverview gRPC-Web generated client stub for kobiton_rpc
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.kobiton_rpc = require('./kobiton_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.kobiton_rpc.KobitonRpcClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.kobiton_rpc.KobitonRpcPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.kobiton_rpc.StartVideoStreamRequest,
 *   !proto.kobiton_rpc.VideoFrame>}
 */
const methodDescriptor_KobitonRpc_StartVideoStream = new grpc.web.MethodDescriptor(
  '/kobiton_rpc.KobitonRpc/StartVideoStream',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.kobiton_rpc.StartVideoStreamRequest,
  proto.kobiton_rpc.VideoFrame,
  /**
   * @param {!proto.kobiton_rpc.StartVideoStreamRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.kobiton_rpc.VideoFrame.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.kobiton_rpc.StartVideoStreamRequest,
 *   !proto.kobiton_rpc.VideoFrame>}
 */
const methodInfo_KobitonRpc_StartVideoStream = new grpc.web.AbstractClientBase.MethodInfo(
  proto.kobiton_rpc.VideoFrame,
  /**
   * @param {!proto.kobiton_rpc.StartVideoStreamRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.kobiton_rpc.VideoFrame.deserializeBinary
);


/**
 * @param {!proto.kobiton_rpc.StartVideoStreamRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.kobiton_rpc.VideoFrame>}
 *     The XHR Node Readable Stream
 */
proto.kobiton_rpc.KobitonRpcClient.prototype.startVideoStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/kobiton_rpc.KobitonRpc/StartVideoStream',
      request,
      metadata || {},
      methodDescriptor_KobitonRpc_StartVideoStream);
};


/**
 * @param {!proto.kobiton_rpc.StartVideoStreamRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.kobiton_rpc.VideoFrame>}
 *     The XHR Node Readable Stream
 */
proto.kobiton_rpc.KobitonRpcPromiseClient.prototype.startVideoStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/kobiton_rpc.KobitonRpc/StartVideoStream',
      request,
      metadata || {},
      methodDescriptor_KobitonRpc_StartVideoStream);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.kobiton_rpc.HelloRequest,
 *   !proto.kobiton_rpc.HelloReply>}
 */
const methodDescriptor_KobitonRpc_SayHello = new grpc.web.MethodDescriptor(
  '/kobiton_rpc.KobitonRpc/SayHello',
  grpc.web.MethodType.UNARY,
  proto.kobiton_rpc.HelloRequest,
  proto.kobiton_rpc.HelloReply,
  /**
   * @param {!proto.kobiton_rpc.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.kobiton_rpc.HelloReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.kobiton_rpc.HelloRequest,
 *   !proto.kobiton_rpc.HelloReply>}
 */
const methodInfo_KobitonRpc_SayHello = new grpc.web.AbstractClientBase.MethodInfo(
  proto.kobiton_rpc.HelloReply,
  /**
   * @param {!proto.kobiton_rpc.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.kobiton_rpc.HelloReply.deserializeBinary
);


/**
 * @param {!proto.kobiton_rpc.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.kobiton_rpc.HelloReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.kobiton_rpc.HelloReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.kobiton_rpc.KobitonRpcClient.prototype.sayHello =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/kobiton_rpc.KobitonRpc/SayHello',
      request,
      metadata || {},
      methodDescriptor_KobitonRpc_SayHello,
      callback);
};


/**
 * @param {!proto.kobiton_rpc.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.kobiton_rpc.HelloReply>}
 *     A native promise that resolves to the response
 */
proto.kobiton_rpc.KobitonRpcPromiseClient.prototype.sayHello =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/kobiton_rpc.KobitonRpc/SayHello',
      request,
      metadata || {},
      methodDescriptor_KobitonRpc_SayHello);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.kobiton_rpc.RepeatHelloRequest,
 *   !proto.kobiton_rpc.HelloReply>}
 */
const methodDescriptor_KobitonRpc_SayRepeatHello = new grpc.web.MethodDescriptor(
  '/kobiton_rpc.KobitonRpc/SayRepeatHello',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.kobiton_rpc.RepeatHelloRequest,
  proto.kobiton_rpc.HelloReply,
  /**
   * @param {!proto.kobiton_rpc.RepeatHelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.kobiton_rpc.HelloReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.kobiton_rpc.RepeatHelloRequest,
 *   !proto.kobiton_rpc.HelloReply>}
 */
const methodInfo_KobitonRpc_SayRepeatHello = new grpc.web.AbstractClientBase.MethodInfo(
  proto.kobiton_rpc.HelloReply,
  /**
   * @param {!proto.kobiton_rpc.RepeatHelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.kobiton_rpc.HelloReply.deserializeBinary
);


/**
 * @param {!proto.kobiton_rpc.RepeatHelloRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.kobiton_rpc.HelloReply>}
 *     The XHR Node Readable Stream
 */
proto.kobiton_rpc.KobitonRpcClient.prototype.sayRepeatHello =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/kobiton_rpc.KobitonRpc/SayRepeatHello',
      request,
      metadata || {},
      methodDescriptor_KobitonRpc_SayRepeatHello);
};


/**
 * @param {!proto.kobiton_rpc.RepeatHelloRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.kobiton_rpc.HelloReply>}
 *     The XHR Node Readable Stream
 */
proto.kobiton_rpc.KobitonRpcPromiseClient.prototype.sayRepeatHello =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/kobiton_rpc.KobitonRpc/SayRepeatHello',
      request,
      metadata || {},
      methodDescriptor_KobitonRpc_SayRepeatHello);
};


module.exports = proto.kobiton_rpc;

