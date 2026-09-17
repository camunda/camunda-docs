---
id: recovery-api
title: "Recovery API"
sidebar_label: "Recovery API"
sidebar_position: 31
mdx:
  format: md
---

# Recovery API

`RecoveryApi` — 5 operations. Call any of these directly on the client, or via `$client->api(\Camunda\Orchestration\Api\Api\RecoveryApi::class)`.

- `changeClusterMode()`
- `changeClusterModeAsClusterAdmin()`
- `getRestoreStatus()`
- `restore()`
- `restoreAsClusterAdmin()`
