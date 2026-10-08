---
id: rust-sdk
title: "Rust SDK (Technical Preview)"
sidebar_label: "Rust SDK (Technical Preview)"
sidebar_position: 1
mdx:
  format: md
---

# Rust SDK (Technical Preview)

:::caution Technical Preview
The Rust SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

Ergonomic Rust SDK for the [Camunda 8 Orchestration Cluster REST API](../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

This SDK follows the same architecture as the official
[JavaScript](https://github.com/camunda/orchestration-cluster-api-js),
[Python](https://github.com/camunda/orchestration-cluster-api-python), and
[C#](https://github.com/camunda/orchestration-cluster-api-csharp) SDKs:

- A **generated low-level client** (`camunda-orchestration-api-client`) produced from the
  upstream OpenAPI spec (sourced and bundled with
  [`camunda-schema-bundler`](https://github.com/camunda/camunda-schema-bundler)).
- A **hand-written runtime** (`camunda-orchestration-sdk`) on top: environment-driven
  configuration, authentication, typed errors, and **job workers**.
- The **Camunda Domain Type System**: semantic keys such as `JobKey` and
  `ProcessInstanceKey` are nominal newtypes with validation, not bare strings.

Target API version: **8.10** (`main`).
