---
id: grpc
title: "Overview"
sidebar_position: 1
slug: /apis-tools/zeebe-api/overview
description: "Zeebe clients use gRPC to communicate with the cluster. Activate jobs, cancel and create process instances, and more. You can use gRPC — a high-performance, ..."
keywords: ["backpressure", "back-pressure", "back pressure"]
---

You can use [gRPC](https://grpc.io/) — a high-performance, cross-platform remote procedure call (RPC) framework — to communicate with the Orchestration Cluster.

## Why use gRPC?

Using this API may be beneficial if your use-case requires low-latency or high-throughput communication.

Benefits of gRPC include:

- Low-latency, high-throughput communication
- Bidirectional streaming for efficient microservices integration
- Ideal for scalable, event-driven process automation

## Key capabilities

- Activate jobs
- Create and cancel process instances
- Manage workflows and more

See [Zeebe API RPCs](gateway-service.md) for all available operations. Additionally, review [technical error handling](/apis-tools/zeebe-api/technical-error-handling.md) for a closer look at business logic errors, or [Postman](https://www.postman.com/camundateam/camunda-8-postman/collection/jzgs776/zeebe-api-grpc?action=share&creator=11465105) to experiment with the API.

## Authentication

Authentication for the Zeebe API (gRPC) depends on your environment and how you deploy Camunda 8. You can find more details in the [Authentication guide](./zeebe-api-authentication.md).
