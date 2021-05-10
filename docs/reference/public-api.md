---
id: public-api
title: "Public API"
---

Camunda Cloud provides a public API. This section covers the definition of the public API and backwards compatibility for version updates.

## Backwards Compatibility for Public API

Camunda Cloud versioning scheme follows the `MAJOR.MINOR.PATCH` pattern put forward by [Semantic Versioning](https://semver.org/). Camunda Cloud will
maintain public API backwards compatibility for `MINOR` version updates. Example: Update from version `1.0.x` to `1.1.y` will not break the public API.

To learn more about our release cycle, please refer to our [release
policy](/reference/release-policy.md).


## Definition of Public API

Camunda Cloud public API is limited to the following items:

### [Zeebe Client Java API](/product-manuals/clients/java-client/index.md)

All non-implementation Java packages (package name does not contain `impl`) of the following maven modules.

- `io.camunda:zeebe-client-java`


## Other APIs and Client

Although we cannot guarentee backwards comptability of others APIs and Clients 
at this moment of time, we aim to offer backwards compatibility still on a best
effort basis.
