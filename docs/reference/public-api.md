---
id: public-api
title: Camunda 8 public API
sidebar_label: Public API
description: Learn what’s included in Camunda 8's public API and its stability guarantees under Semantic Versioning (SemVer), API changes and versioning policies, and what to expect when upgrading.
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## What is the public API?

Camunda 8 follows [Semantic Versioning (SemVer)](https://semver.org/) to provide users with a stable and reliable platform. A key requirement of SemVer is a clearly defined public API.

The public API is the official contract between Camunda and its users under SemVer. No breaking changes will be made to the public API in minor or patch releases. You can safely build on these interfaces with the expectation of stability and backward compatibility.

- This is a subset of all available APIs. Many [APIs](/apis-tools/working-with-apis-tools.md) are public-facing but not covered by the SemVer stability contract.
- Only components explicitly listed on this page (see [Included in the public API](#included-in-the-public-api)) are covered. Anything not listed is _not_ guaranteed under SemVer.
- The public API contract begins with version 8.8.

:::note
The term "public API" refers to the SemVer definition of stable interfaces, not external APIs available to users.
:::

### Included in the public API

The following components are officially part of the Camunda 8 public API:

- [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md): The primary interface for interacting with the Orchestration Cluster.
- [Camunda Process Test](/apis-tools/testing/getting-started.md): Testing library to test BPMN processes and process applications.
- [Camunda Java client](/apis-tools/java-client/getting-started.md): Java Client to interact with Orchestration Cluster REST API and Zeebe gRPC.
- [Camunda Spring Boot Starter](/apis-tools/camunda-spring-boot-starter/getting-started.md): Spring Boot Client to interact with Orchestration Cluster REST API and Zeebe gRPC.

## What is not included in the public API

Some APIs are excluded from the public API by design. While we aim for stability, they may evolve more quickly or follow different lifecycles.

Only the APIs listed in [Included in the public API](#included-in-the-public-api) are covered by SemVer guarantees. All others are considered outside the public API. The [excluded APIs listed below](#excluded-apis) are commonly used, but this list is not exhaustive.

### Alpha endpoints within the public API

Some endpoints in otherwise stable APIs are marked as [alpha features](/components/early-access/alpha/alpha-features.md) and are **not** included in the public API guarantee.

Alpha endpoints:

- Are clearly marked in API docs.
- May introduce breaking changes in minor or patch releases.
- Follow the [alpha feature policy](/components/early-access/alpha/alpha-features.md#alpha) rather than SemVer.
- Are released for early feedback before general availability.

Check the API documentation before building on any alpha endpoint.

### Excluded APIs

The following APIs are **explicitly excluded** from the public API:

- [Web Modeler API](/apis-tools/web-modeler-api/index.md): Used for browser-based modeling.
- [Administration API](/apis-tools/administration-api/administration-api-reference.md): For administrative operations and system configuration.
- [Optimize API](/apis-tools/optimize-api/overview.md): Used for analytics, reporting, and performance insights.
- [Orchestration Cluster MCP Server](/apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview.md): Exposes Camunda capabilities through the Model Context Protocol. Tool schemas and behavior may evolve across versions.

### Policy for non-public APIs

Though not covered by the public API contract, we aim to provide a consistent experience. For non-public APIs, we commit to:

- Following API versioning best practices.
- Announcing deprecations at least two minor versions in advance (for example, deprecated in 8.9, removed no earlier than 8.11).
- Avoiding breaking changes to configuration, endpoints, or backup-related features within the same minor release range.

This balance allows continuous improvement to tools like Web Modeler and Console, while preserving stability for orchestration logic.

## Client and API compatibility

Public API components follow strict compatibility guarantees so you can upgrade clients and clusters independently.

| Component                                                                                                               | Forward-compatible | Backward-compatible |
| ----------------------------------------------------------------------------------------------------------------------- | :----------------: | :-----------------: |
| [Camunda Java client](/apis-tools/java-client/getting-started.md)                                                       |         ✅         |         ✅          |
| [Spring SDK](/apis-tools/camunda-spring-boot-starter/getting-started.md)                                                |         ✅         |         ✅          |
| [Node.js SDK](https://github.com/camunda/camunda-nodejs-sdk)                                                            |         ✅         |         ✅          |
| [Camunda Process Test](/apis-tools/testing/getting-started.md)                                                          |         ✅         |         ✅          |
| [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) |         —          |         ✅          |

- **Forward-compatible** means a client can work with a _newer_ version of the Orchestration Cluster than the client version.
- **Backward-compatible** means a client can be upgraded to a _newer_ version without requiring changes to your application code.

### Clients and SDKs

The Camunda Java client, Spring SDK, Node.js SDK, and Camunda Process Test (CPT) are both **forward-compatible** and **backward-compatible** with the Orchestration Cluster.

**Forward compatibility** means your application can use an older client version and still work correctly against a newer cluster. For example, an application using Camunda Java client **8.8.3** works against an Orchestration Cluster running **8.9.1**. This allows you to upgrade the Orchestration Cluster first without immediately updating your client libraries.

**Backward compatibility** means that when you upgrade the client or SDK version in your application, no code changes are required. New minor and patch versions of the clients do not introduce breaking changes. For example, upgrading the Spring SDK dependency from **8.8.x** to **8.9.x** does not require changes to your application code.

### Camunda Process Test (CPT)

CPT is both forward-compatible and backward-compatible with the Orchestration Cluster and Connectors runtime:

- **Forward-compatible**: You can change the version of the Orchestration Cluster/Connectors bundle in your tests to a newer version without any changes.
- **Backward-compatible**: Upgrading the CPT dependency version does not require changes to your existing tests.

### REST APIs

The [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) is **backward-compatible**. No breaking changes are introduced to existing endpoints in newer versions of the Orchestration Cluster. For example, if you build a custom client implementation against the **8.8** REST APIs, it continues to work against a newer Orchestration Cluster version such as **8.9**.

:::note
Because REST API endpoints are part of the Orchestration Cluster itself, forward compatibility does not apply — your cluster version determines which endpoints are available.
:::

### Recommended upgrade order

When upgrading across minor versions, the recommended approach is:

1. **Upgrade the Orchestration Cluster first.** Forward compatibility of clients ensures your existing applications continue to work.
2. **Upgrade your client libraries.** Backward compatibility of clients ensures no code changes are needed.
