---
title: "API reference"
sidebar_label: "Overview"
mdx:
  format: md
---

# API reference

:::caution Technical Preview
The Go SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

This reference covers the hand-written ergonomic surface of the Go SDK: the client, its configuration, the job workers, and the error and polling helpers.

| Page                               | Contents                                                             |
| ---------------------------------- | -------------------------------------------------------------------- |
| [CamundaClient](camunda-client.md) | The client and its 251 API methods.                                  |
| [Configuration](configuration.md)  | Client configuration, authentication, TLS, and retry policy.         |
| [Job workers](job-workers.md)      | REST and gRPC job workers, their options, and the handler contract.  |
| [Runtime](runtime.md)              | Error types, error classification, and eventual-consistency polling. |
| [Domain keys](domain-keys.md)      | 46 validated identifier types.                                       |

The generated request and response models, enums and builders are not reproduced here — there are several hundred of them. Import them from the `camunda` package like everything else (for example `camunda.ProcessInstanceResult`); their fields and methods are documented on [pkg.go.dev](https://pkg.go.dev/github.com/camunda/orchestration-cluster-api-go/client). Each method on the [CamundaClient](camunda-client.md) page links the generated types in its signature to that documentation.
