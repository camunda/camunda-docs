---
id: recovery-api
title: "Recovery Api"
sidebar_label: "Recovery Api"
sidebar_position: 31
mdx:
  format: md
---

# Recovery Api

`RecoveryApi` — 5 operations. Call any of these directly on the client, or via `$client->api(\Camunda\Orchestration\Api\Api\RecoveryApi::class)`.

- `changeClusterMode()`
- `changeClusterModeAsClusterAdmin()`
- `getRestoreStatus()`
- `restore()`
- `restoreAsClusterAdmin()`
