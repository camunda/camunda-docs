---
id: public-api
title: "Public API"
---

Camunda Cloud provides a public API. This section covers the definition of the public API and backwards compatibility for version updates.

## Backwards compatibility for public API

Camunda Cloud versioning scheme follows the `MAJOR.MINOR.PATCH` pattern put forward by [Semantic Versioning](https://semver.org/). Camunda Cloud will
maintain public API backwards compatibility for `MINOR` version updates.

Example: Update from version `1.0.x` to `1.1.y` will not break the public API.

To learn more about our release cycle, refer to our [release
policy](/reference/release-policy.md).

## Definition of public API

Currently, both Zeebe API and [Tasklist API](/apis-tools/tasklist-api/generated.md) are officially supported APIs:

- [Zeebe Client Java API](/apis-tools/java-client/index.md)
- [Tasklist API](/apis-tools/tasklist-api/generated.md)

All non-implementation Java packages (package name does not contain `impl`) of the following maven modules.

- `io.camunda:zeebe-client-java`

## Other APIs and clients

Although we cannot currently guarantee backwards comptability of other APIs and clients, we aim to offer backwards compatibility still on a best
effort basis.

[//]:# (Thoughts on a better way to word the sentence above?)
