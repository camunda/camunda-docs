---
id: protocols
title: "Protocols"
---

Zeebe clients connect to brokers via a stateless gateway.

For the communication between client and gateway, [gRPC](https://grpc.io/) is used. The communication protocol is defined using Protocol Buffers v3 ([proto3](https://developers.google.com/protocol-buffers/docs/proto3)), and you can find it in the
[Zeebe repository](https://github.com/camunda-cloud/zeebe/tree/develop/gateway-protocol).

## What is gRPC?

gRPC was first developed by Google and is now an open-source project and part of the Cloud Native Computing Foundation.

If you’re new to gRPC, the [What is gRPC](https://grpc.io/docs/guides/index.html) page on the project website provides a good introduction to it.

## Why gRPC?

gRPC has many beneficial features that make it a good fit for Zeebe:

- Supports bi-directional streaming for opening a persistent connection and sending or receiving a stream of messages between client and server.
- Uses the common HTTP/2 protocol by default.
- Uses Protocol Buffers as an interface definition and data serialization mechanism–specifically, Zeebe uses proto3, which supports easy client generation in ten different programming languages.

## Supported clients

Currently, Zeebe officially supports two gRPC clients: one in [Java](/apis-tools/java-client/index.md), and one in [Golang](/apis-tools/go-client/get-started.md).

[Community clients](/apis-tools/community-clients/index.md) have been created in other languages, including C#, Ruby, and JavaScript.

If there is no client in your target language yet, you can [build your own client](/apis-tools/build-your-own-client.md) in a range of different programming languages.

## Intercepting calls

Zeebe supports loading arbitrary gRPC server interceptors to intercept incoming
calls. You can read more about it
[here](self-managed/zeebe-deployment/interceptors.md).
