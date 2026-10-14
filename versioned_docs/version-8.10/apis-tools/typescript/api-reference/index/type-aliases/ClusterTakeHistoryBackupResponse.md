---
title: "Type Alias: ClusterTakeHistoryBackupResponse"
sidebar_label: "ClusterTakeHistoryBackupResponse"
mdx:
  format: md
---

# Type Alias: ClusterTakeHistoryBackupResponse

```ts
type ClusterTakeHistoryBackupResponse = object;
```

The snapshots scheduled on every targeted physical tenant. No cluster-level state is aggregated from the per-tenant outcomes.

## Properties

### backupId

```ts
backupId: BackupId;
```

The id requested for the backup on every targeted physical tenant.

---

### physicalTenants

```ts
physicalTenants: ClusterHistoryBackupTakeResult[];
```

The outcome for each targeted physical tenant, ordered by physical tenant id.
