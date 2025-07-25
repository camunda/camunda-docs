---
id: public-api
title: Camunda 8 public API
sidebar_label: Public API
description: Understand the Camunda 8 public API, its stability guarantees under Semantic Versioning (SemVer), and the policies governing API changes and versioning.
---

Camunda 8 follows [Semantic Versioning (SemVer)](https://semver.org/) to provide users with a stable and reliable platform. A key requirement of SemVer is a clearly defined public API. This page outlines what’s included in Camunda 8's public API, the policies around versioning, and what to expect when upgrading.

:::note
The term "public API" refers to the SemVer definition of stable interfaces, not external APIs available to users.
:::

## What is the public API?

The public API is the official contract between Camunda and its users under SemVer. No breaking changes will be made to the public API in minor or patch releases. You can safely build on these interfaces with the expectation of stability and backward compatibility.

This is a subset of all available APIs — many [APIs](/apis-tools/working-with-apis-tools.md) are public-facing but not covered by the SemVer stability contract.

Only components explicitly listed on this page (see [Included in the public API](#included-in-the-public-api)) are covered. Anything not listed is _not_ guaranteed under SemVer.

The public API contract begins with version 8.8.

### Included in the public API

The following components are officially part of the Camunda 8 public API:

- [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md): The primary interface for interacting with the Orchestration Cluster.
- [Camunda Process Test](/apis-tools/testing/getting-started.md): Testing library to test BPMN processes and process applications.
- [Camunda Java client](/apis-tools/java-client/index.md): Java Client to interact with Orchestration Cluster API and Zeebe gRPC.
- [Camunda Spring Boot SDK](/apis-tools/spring-zeebe-sdk/getting-started.md): Spring Boot Client to interact with Orchestration Cluster API and Zeebe gRPC.

## What is not included in the public API

Some APIs are excluded from the public API by design. While we aim for stability, they may evolve more quickly or follow different lifecycles.

Only the APIs listed in [Included in the public API](#included-in-the-public-api) are covered by SemVer guarantees. All others are considered outside the public API. The [excluded APIs listed below](#excluded-apis) are commonly used, but this list is not exhaustive.

### Alpha endpoints within the public API

Some endpoints in otherwise stable APIs are marked as [alpha features](/components/early-access/alpha/alpha-features.md) and are **not** included in the public API guarantee.

Alpha endpoints:

- Are clearly marked in API docs
- May introduce breaking changes in minor or patch releases
- Follow the [alpha feature policy](/components/early-access/alpha/alpha-features.md#alpha) rather than SemVer
- Are released for early feedback before general availability

Check API docs before building on any alpha endpoint.

### Excluded APIs

The following APIs are **explicitly excluded** from the public API:

- [Web Modeler API](/apis-tools/web-modeler-api/index.md): Used for browser-based modeling.
- [Administration API](/apis-tools/administration-api/administration-api-reference.md): For administrative operations and system configuration.
- [Optimize API](/apis-tools/optimize-api/overview.md): Used for analytics, reporting, and performance insights.

### Policy for non-public APIs

Though not covered by the public API contract, we aim to provide a consistent experience. For non-public APIs, we commit to:

- Following API versioning best practices
- Announcing deprecations at least two minor versions in advance (e.g., deprecated in 8.9, removed no earlier than 8.11)
- Avoiding breaking changes to configuration, endpoints, or backup-related features within the same minor release range

This balance allows continuous improvement to tools like Web Modeler and Console, while preserving stability for orchestration logic.
