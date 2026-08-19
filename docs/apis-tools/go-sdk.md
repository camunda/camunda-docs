---
id: go-sdk
title: "Go SDK (Technical Preview)"
sidebar_label: "Go SDK (Technical Preview)"
sidebar_position: 1
mdx:
  format: md
---

# Go SDK (Technical Preview)

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

An idiomatic Go client for the [Camunda 8](https://camunda.io) Orchestration
Cluster REST API, with a gRPC job-streaming worker. It pairs a **generated
low-level REST client** (produced from the upstream OpenAPI specification) with a
hand-written **ergonomic runtime** that handles the concerns real integrations
need: configuration, authentication, adaptive backpressure, transient retry, and
eventual-consistency handling.

This is a sibling of the [Rust](https://github.com/camunda/orchestration-cluster-api-rust),
[TypeScript](https://github.com/camunda/orchestration-cluster-api-js),
[Python](https://github.com/camunda/orchestration-cluster-api-python), and
[C#](https://github.com/camunda/orchestration-cluster-api-csharp) SDKs and follows
the same two-layer architecture.
