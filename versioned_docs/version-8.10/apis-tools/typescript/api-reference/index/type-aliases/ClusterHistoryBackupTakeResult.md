---
title: "Type Alias: ClusterHistoryBackupTakeResult"
sidebar_label: "ClusterHistoryBackupTakeResult"
mdx:
  format: md
---

# Type Alias: ClusterHistoryBackupTakeResult

```ts
type ClusterHistoryBackupTakeResult = object;
```

The snapshots scheduled on a single physical tenant. Only successfully scheduled tenants are reported: the request fails as a whole if any targeted tenant could not schedule the backup.

## Properties

### physicalTenantId

```ts
physicalTenantId: string;
```

The id of the physical tenant.

---

### scheduledSnapshots

```ts
scheduledSnapshots: string[];
```

The names of the snapshots scheduled on this physical tenant.
