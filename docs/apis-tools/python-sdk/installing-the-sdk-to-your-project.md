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

This SDK does **not** follow traditional semver. The **major.minor** version tracks the Camunda server version, so you can easily match the SDK to your deployment target (e.g. SDK `8.9.x` targets Camunda `8.9`).

**Patch releases** contain fixes, features, and occasionally **breaking type changes**. A breaking type change typically means an upstream API definition fix that corrects the shape of a request or response model — your code may stop type-checking even though it worked before.

When this happens, we signal it in the [CHANGELOG](https://github.com/camunda/orchestration-cluster-api-python/releases).

**Recommended approach:**

- **Ride the latest** — accept that types may shift and update your code when it happens. This keeps you on the most accurate API surface.
- **Pin and review** — pin to a specific patch version and review the [CHANGELOG](https://github.com/camunda/orchestration-cluster-api-python/releases) before upgrading:

  ```text
  camunda-orchestration-sdk==8.9.3
  ```
