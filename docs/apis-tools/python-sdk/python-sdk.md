---
id: python-sdk
title: Python SDK
sidebar_label: Python SDK
sidebar_position: 1
mdx:
  format: md
---

# Camunda Orchestration Cluster API – Python SDK


A fully typed Python client for the [Camunda 8 Orchestration Cluster REST API](../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md). Generated from the upstream OpenAPI spec with hand-written runtime infrastructure for authentication, configuration, and job workers.

- **Sync and async** — `CamundaClient` (synchronous) and `CamundaAsyncClient` (async/await)
- **Strict typing** — pyright-strict compatible with PEP 561 `py.typed` marker
- **Zero-config** — reads `CAMUNDA_*` environment variables (12-factor style)
- **Job workers** — long-poll workers with thread, process, or async execution strategies
- **OAuth & Basic auth** — pluggable authentication with automatic token management
- **Pluggable logging** — inject your own logger (stdlib `logging`, loguru, or custom)
