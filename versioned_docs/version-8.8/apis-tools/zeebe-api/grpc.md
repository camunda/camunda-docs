---
id: grpc
title: "Overview"
sidebar_position: 1
slug: /apis-tools/zeebe-api/overview
description: "Zeebe clients use gRPC to communicate with the cluster. Activate jobs, cancel and create process instances, and more."
keywords: ["backpressure", "back-pressure", "back pressure"]
---

[Zeebe](/components/zeebe/zeebe-overview.md) clients use [gRPC](https://grpc.io/) to communicate with the Zeebe cluster. A cross-platform and high-performance remote procedure call (RPC) framework, gRPC offers benefits for microservices architectures, such as bidirectional data streaming and support for high performance use cases. Using this API may be beneficial with Zeebe because it offers advantages for low-latency and high-throughput use cases.

See [Zeebe API RPCs](gateway-service.md) for all available operations. Additionally, review [technical error handling](/docs/apis-tools/zeebe-api/technical-error-handling.md) for a closer look at business logic errors, or [Postman](https://www.postman.com/camundateam/camunda-8-postman/collection/jzgs776/zeebe-api-grpc?action=share&creator=11465105) to experiment with the API.

To authorize the Zeebe API (gRPC) in a [Self-Managed](/self-managed/about-self-managed.md) setup,
see [client authorization](/self-managed/zeebe-deployment/security/client-authorization.md).
