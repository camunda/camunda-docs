---
title: "Type Alias: ClusterHistoryBackupInfoWritable"
sidebar_label: "ClusterHistoryBackupInfoWritable"
mdx:
  format: md
---

# Type Alias: ClusterHistoryBackupInfoWritable

```ts
type ClusterHistoryBackupInfoWritable = object;
```

A history backup id and what each physical tenant reports for it. No cluster-level state is aggregated from the per-tenant states.

## Properties

### backupId

```ts
backupId: BackupId;
```

The id of the backup.

---

### physicalTenants

```ts
physicalTenants: ClusterHistoryBackupTenantInfoWritable[];
```

What each physical tenant reports for this backup id, ordered by physical tenant id. When looking a backup id up directly, every targeted tenant is listed, including the ones reporting `NOT_FOUND`. Within a listing, only the tenants that hold the id are listed.
