---
id: public-api
title: Camunda 8 Public API
sidebar_label: Public API
---

To provide our users with a stable and reliable platform, Camunda 8 adheres to [Semantic Versioning (SemVer)](https://semver.org/). A key requirement for SemVer is a clearly defined Public API. This page outlines what is included in Camunda 8's Public API, our policies for versioning, and what you can expect when upgrading.

## Definition of the Public API

The Public API is the contract between Camunda and our users. We guarantee that we will not introduce breaking changes to the Public API in minor or patch releases. You can build your solutions on these interfaces with confidence.

Anything not explicitly listed in this document is not considered part of the Public API.

The following components are part of the Camunda 8 Public API:

- [Orchestration Cluster API](/apis-tools/camunda-api-rest/camunda-api-rest-overview.md): The primary interface for interacting with the orchestration cluster.

## Non-Public APIs

Some APIs are not considered part of the Public API. While we strive to keep them stable, they are subject to change and may have different lifecycle policies.

The following APIs are **explicitly excluded** from the Public API definition:

- [Web Modeler API](/apis-tools/web-modeler-api/index.md)
- [Administration API](/apis-tools/administration-api/administration-api-reference.md)
- [Optimize API](/apis-tools/optimize-api/overview.md)

### Policy for Non-Public APIs

Even though these APIs are not part of the formal Public API, we are committed to providing a smooth experience. For these non-public APIs, we will:

- Follow API versioning best practices.
- Announce any deprecations at least two minor versions in advance (e.g., a feature deprecated in 8.9 will not be removed before 8.11).
- Avoid breaking changes to configuration, endpoints, or backup functionality between minor versions.

This approach allows us to iterate and improve on our supporting tools like Web Modeler and Console, while providing a rock-solid foundation for your core orchestration logic.
