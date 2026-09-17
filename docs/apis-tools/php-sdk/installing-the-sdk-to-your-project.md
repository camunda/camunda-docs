---
id: installing-the-sdk-to-your-project
title: "Installing the SDK to your project"
sidebar_label: "Installing the SDK to your project"
sidebar_position: 3
mdx:
  format: md
---

# Installing the SDK to your project

:::caution Technical Preview
The PHP SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

## Requirements

- PHP 8.2 or later
- [Composer](https://getcomposer.org/)
- `ext-json`; `ext-pcntl` is optional (enables forked job workers)

## Stable release (recommended for production)

The stable version tracks the latest supported Camunda server release.

```bash
composer require camunda/orchestration-cluster-api
```

## Versioning

This SDK has a different release cadence from the Camunda server. The major version of the SDK signals a 1:1 type coherence with the server API for a Camunda minor release.

SDK version `n.y.z` → server version `8.n`, so the type surface of SDK version `10.y.z` matches the API surface of Camunda `8.10`.

Using the matching SDK major version for the server minor version provides the strongest guarantees about runtime reliability.
