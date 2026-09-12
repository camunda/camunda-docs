---
id: grpc
title: "Zeebe API (gRPC)"
sidebar_position: 1
slug: /apis-tools/zeebe-api/overview
description: "Use the Zeebe API (gRPC) to manage and interact with Camunda 8 Orchestration Clusters."
keywords: ["backpressure", "back-pressure", "back pressure"]
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

You can use the [gRPC](https://grpc.io/) high-performance, cross-platform remote procedure call (RPC) framework to communicate with the Orchestration Cluster.

Zeebe clients use gRPC to communicate with the cluster. For example, you can use this API to activate jobs, cancel and create process instances, and more.

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
