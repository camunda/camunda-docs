---
title: "API reference"
sidebar_label: "Overview"
mdx:
  format: md
---

# API reference

This reference covers the hand-written ergonomic surface of the Rust SDK: the client, its configuration, the job worker, and the error and backpressure types.

| Page                               | Contents                                                     |
| ---------------------------------- | ------------------------------------------------------------ |
| [CamundaClient](camunda-client.md) | The client and its 241 API methods.                          |
| [Configuration](configuration.md)  | Client configuration, authentication, TLS, and retry policy. |
| [Job workers](job-workers.md)      | Job worker configuration, handlers, and lifecycle.           |
| [Runtime](runtime.md)              | Error types and adaptive backpressure.                       |
| [Domain keys](domain-keys.md)      | 44 validated identifier newtypes.                            |

The generated request and response models are not reproduced here — there are several hundred of them. Browse them on [docs.rs](https://docs.rs/camunda-orchestration-api-client/latest/camunda_orchestration_api_client/models/index.html), or use your editor's go-to-definition on any method signature.
