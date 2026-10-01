---
id: php-sdk
title: "PHP SDK (Technical Preview)"
sidebar_label: "PHP SDK (Technical Preview)"
sidebar_position: 1
mdx:
  format: md
---

# PHP SDK (Technical Preview)

:::caution Technical Preview
The PHP SDK is a **technical preview**. Its API surface may still evolve and changes may not follow semantic versioning. Pin an exact version if you need stability.
:::

A fully typed PHP client for the [Camunda 8 Orchestration Cluster REST API](../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md). Fully compliant with the Camunda OpenAPI spec, with a hand-written runtime for authentication, configuration, and job workers.

- **Sync and async** — `CamundaClient` (synchronous) and `CamundaAsyncClient` (promise-based)
- **Semantic value objects** — distinct types for every identifier, checked at `PHPStan` level `max`
- **Zero-config** — reads `CAMUNDA_*` environment variables (12-factor style)
- **Job workers** — long-poll workers with optional `pcntl` process forking
- **OAuth & Basic authentication** — pluggable authentication with automatic token management
- **PSR standards** — PSR-4 autoloading, PSR-18/PSR-7 HTTP via Guzzle
