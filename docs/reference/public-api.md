---
id: public-api
title: Camunda 8 public API
sidebar_label: Public API
description: Understand the Camunda 8 public API, its stability guarantees under Semantic Versioning (SemVer), and the policies governing API changes and versioning.
---

Camunda 8 follows [Semantic Versioning (SemVer)](https://semver.org/) to provide users with a stable and reliable platform. A central requirement of SemVer is a clearly defined public API. This page defines what is included in Camunda 8’s public API, outlines our versioning policies, and explains what you can expect when upgrading.

## What is the public API?

The public API represents the official contract between Camunda and its users. We guarantee that no breaking changes will be introduced to the public API in minor or patch releases. You can build on these interfaces with confidence, knowing they are stable and forward-compatible.

Only the components explicitly listed on this page are considered part of the public API. Anything not listed is _not_ covered by SemVer stability guarantees.

### Included in the public API

The following component is officially part of the Camunda 8 public API:

- The [orchestration cluster API](/apis-tools/camunda-api-rest/camunda-api-rest-overview.md), which provides the primary interface for interacting with the orchestration cluster.

## What is not included

Some APIs are intentionally excluded from the public API definition. While we aim to keep them stable, they may evolve more rapidly and follow different lifecycle policies.

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
