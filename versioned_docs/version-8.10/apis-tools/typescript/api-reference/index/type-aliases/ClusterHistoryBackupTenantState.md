---
title: "Type Alias: ClusterHistoryBackupTenantState"
sidebar_label: "ClusterHistoryBackupTenantState"
mdx:
  format: md
---

# Type Alias: ClusterHistoryBackupTenantState

```ts
type ClusterHistoryBackupTenantState =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "INCOMPLETE"
  | "INCOMPATIBLE"
  | "NOT_FOUND";
```

Cluster History Backup Tenant State

What a physical tenant reports for a history backup id: the per-tenant `HistoryBackupStateCode` extended with `NOT_FOUND` for a tenant that was read and does not hold the backup. `NOT_FOUND` is a successful observation, not a failure — a backup that only some physical tenants hold is a supported outcome. There is no state for a tenant that could not be read at all, because such a tenant fails the whole request.
