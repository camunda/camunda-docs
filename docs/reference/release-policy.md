---
id: release-policy
title: "Release policy"
---

Components of Camunda Cloud follow the [Semantic Versioning standard](https://semver.org/),
which defines a version number using the `MAJOR.MINOR.PATCH` pattern.

- `MAJOR` version can make incompatible API changes.
- `MINOR` version can add functionality in a backwards compatible manner.
- `PATCH` version can make backwards compatible bug fixes.

The Camunda Cloud team strives to release:
- A new minor version of the Camunda Cloud components every three months
- In between minor versions, two alpha releases (to preview the upcoming minor version)

Camunda Cloud supports the last two released minor versions with
patch releases. Patch releases are offered on a best effort basis for the
currently supported versions.
