---
id: installing-the-sdk-to-your-project
title: Installing the SDK to your project
sidebar_label: Installing the SDK to your project
sidebar_position: 2
mdx:
  format: md
---

# Installing the SDK to your project

## Requirements

- Python 3.10 or later

## Stable release (recommended for production)

The stable version tracks the latest supported Camunda server release. The first stable release will be **8.9.0**.

```bash
pip install camunda-orchestration-sdk
```

## Pre-release / dev channel

Pre-release versions (e.g. `8.9.0.dev2`) are published from the `main` branch and contain the latest changes targeting the next server minor version. Use these to preview upcoming features or validate your integration ahead of a stable release.

```bash
# pip
pip install --pre camunda-orchestration-sdk

# pin to a specific pre-release
pip install camunda-orchestration-sdk==8.9.0.dev2
```

In a `requirements.txt`:

```text
camunda-orchestration-sdk>=8.9.0.dev1
```

> **Note:** Pre-release versions may contain breaking changes between builds. Pin to a specific version if you need reproducible builds.

## Versioning

This SDK has a different release cadence from the Camunda server. Features and fixes land in the SDK during a server release.

The major version of the SDK signals a 1:1 type coherence with the server API for a Camunda minor release.

SDK version `n.y.z` -> server version `8.n`, so the type surface of SDK version 9.y.z matches the API surface of Camunda 8.9.

Using a later SDK version, for example: SDK version 10.y.z with Camunda 8.9, means that the SDK contains additive surfaces that are not guaranteed at runtime, and the compiler cannot warn of unsupported operations.

Using an earlier SDK version, for example: SDK version 9.y.z with Camunda 8.10, results in slightly degraded compiler reasoning: exhaustiveness checks cannot be guaranteed by the compiler for any extended surfaces (principally, enums with added members).

In the vast majority of use-cases, this will not be an issue; but you should be aware that using the matching SDK major version for the server minor version provides the strongest compiler guarantees about runtime reliability.

**Recommended approach**:

- Check the [CHANGELOG](https://github.com/camunda/orchestration-cluster-api-python/releases).
- As a sanity check during server version upgrade, rebuild applications with the matching SDK major version to identify any affected runtime surfaces.
