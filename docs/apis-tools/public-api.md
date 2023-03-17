---
id: public-api
title: "Public API"
description: "Camunda Platform 8 provides a public API. Obtain more information on backwards compatibility for version updates."
---

Camunda Platform 8 provides a public API. This section covers the definition of the public API and backwards compatibility for version updates.

## Backwards compatibility for public API

Camunda Platform 8 versioning scheme follows the `MAJOR.MINOR.PATCH` pattern put forward by [semantic versioning](https://semver.org/). Camunda Platform 8 will
maintain public API backwards compatibility for `MINOR` version updates.

Example: Update from version `1.0.x` to `1.1.y` will not break the public API.

To learn more about our release cycle, refer to our [release policy](/reference/release-policy.md).

## Definition of public API

Currently, both Zeebe API and [Tasklist API](/apis-tools/tasklist-api/generated.md) are officially supported APIs:

- [Zeebe Client Java API](/apis-tools/java-client/index.md)
- [Tasklist API](/apis-tools/tasklist-api/generated.md)
- [Operate API](/apis-tools/operate-api/index.md)

All non-implementation Java packages (package name does not contain `impl`) of the following Maven modules.

- `io.camunda:zeebe-client-java`

## Other APIs and clients

Currently, we cannot _guarantee_ backwards compatibility with other APIs and clients, though we do work to offer backwards compatibility to the best of our ability.
