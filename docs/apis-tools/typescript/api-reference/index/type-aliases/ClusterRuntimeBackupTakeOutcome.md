---
title: "Type Alias: ClusterRuntimeBackupTakeOutcome"
sidebar_label: "ClusterRuntimeBackupTakeOutcome"
mdx:
  format: md
---

# Type Alias: ClusterRuntimeBackupTakeOutcome

```ts
type ClusterRuntimeBackupTakeOutcome = "TRIGGERED" | "FAILED" | "UNKNOWN";
```

Cluster Runtime Backup Take Outcome

What a physical tenant did with the trigger. `TRIGGERED` says the backup is running, not that it completed — poll `GET /cluster/v2/backups/runtime/{backupId}` for that. A `FAILED` tenant is running no backup for this request and needs no cleanup. `UNKNOWN` means the broker may or may not have accepted the request — the connection was cut mid-flight, or the gateway timed out waiting — so that tenant's backups have to be checked before retrying; it is reported separately from `FAILED` precisely because calling it failed would claim nothing is running there. Tenants that were triggered are never rolled back.
