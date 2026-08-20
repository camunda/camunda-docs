---
title: "Type Alias: TakeRuntimeBackupRequest"
sidebar_label: "TakeRuntimeBackupRequest"
mdx:
  format: md
---

# Type Alias: TakeRuntimeBackupRequest

```ts
type TakeRuntimeBackupRequest = object;
```

TakeRuntimeBackupRequest

Request body for taking a runtime backup.

## Properties

### backupId?

```ts
optional backupId?: BackupId | null;
```

The id of the backup to take. Must be omitted if continuous backups and/or a
backup or checkpoint schedule is enabled for the physical tenant.
