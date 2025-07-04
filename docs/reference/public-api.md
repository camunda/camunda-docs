---
id: public-api
title: Camunda 8 public API
sidebar_label: Public API
description: Understand the Camunda 8 public API, its stability guarantees under Semantic Versioning (SemVer), and the policies governing API changes and versioning.
---

Camunda 8 follows [Semantic Versioning (SemVer)](https://semver.org/) to provide users with a stable and reliable platform. A central requirement of SemVer is a clearly defined public API. This page defines what is included in Camunda 8's public API, outlines our versioning policies, and explains what you can expect when upgrading.

:::note
The term "public API" in this context refers to the SemVer definition of interfaces with stability guarantees, not to be confused with external APIs that are available to users.
:::

## What is the public API?

The public API represents the official contract between Camunda and its users for SemVer stability. We guarantee that no breaking changes will be introduced to the public API in minor or patch releases. You can build on these interfaces with confidence, knowing they are stable and backwards-compatible.

Note that this is a subset of all available APIs — many [APIs](/apis-tools/working-with-apis-tools.md) are available for external use but are not included in the formal public API stability commitment.

Only the components explicitly listed on this page (see ["Included in the public API"](#included-in-the-public-api)) are considered part of the public API. Anything not listed is _not_ covered by SemVer stability guarantees.

The public API contract is introduced with the 8.8 release.

### Included in the public API

The following components are officially part of the Camunda 8 public API:

- The [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md), which provides the primary interface for interacting with the orchestration cluster.
- [Camunda Process Test](/apis-tools/testing/getting-started.md), which provides testing capabilities for process automation scenarios.
- [Camunda Java client](/apis-tools/java-client/index.md), which provides Java libraries for interacting with Camunda 8.
- [Camunda Spring Boot SDK](/apis-tools/spring-zeebe-sdk/getting-started.md), which provides Spring Boot integration for interacting with Camunda 8.

## What is not included in the public API

Some APIs are intentionally excluded from the public API definition. While we aim to keep them stable, they may evolve more rapidly and follow different lifecycle policies.

Only the APIs and interfaces explicitly listed as ["Included in the public API"](#included-in-the-public-api) are covered by our SemVer stability guarantees. Any API or interface not explicitly listed is considered outside the public API contract. The [excluded APIs listed below](#excluded-apis) represent the most commonly used APIs to provide clarity, but this list is not exhaustive.

### Alpha endpoints within the public API

Even within APIs that are part of the public API contract, individual endpoints may be marked as [alpha features](/components/early-access/alpha/alpha-features.md). **Alpha endpoints are explicitly excluded from the public API stability guarantees**, even when they are part of an otherwise stable API.

Alpha endpoints within the public API:

- Are clearly marked as alpha in the API documentation
- Can introduce breaking changes in minor or patch releases
- Follow the [alpha feature policy](/components/early-access/alpha/alpha-features.md#alpha) rather than SemVer commitments
- Are released for early testing and feedback before reaching general availability

Always check the API documentation to identify alpha endpoints before building production integrations.

### Excluded APIs

The following APIs are **explicitly excluded** from the public API:

- The [Web Modeler API](/apis-tools/web-modeler-api/index.md), used for browser-based model design.
- The [Administration API](/apis-tools/administration-api/administration-api-reference.md), which enables administrative control and system configuration.
- The [Optimize API](/apis-tools/optimize-api/overview.md), used for analytics, reporting, and performance insights.

### Policy for non-public APIs

Although these APIs are not part of the formal public API, we are committed to providing a consistent and predictable developer experience. For non-public APIs, we will:

- Apply API versioning best practices to maintain clarity and minimize disruption.
- Announce deprecations at least two minor versions in advance. For example, a feature deprecated in version 8.9 will not be removed before 8.11.
- Avoid introducing breaking changes to configuration, endpoints, or backup-related functionality within the same minor version range.

This approach allows us to continuously improve supporting tools—like Web Modeler and Console—while preserving a stable core for your orchestration logic.
