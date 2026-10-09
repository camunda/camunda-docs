---
title: "Type Alias: TakeHistoryBackupResponse"
sidebar_label: "TakeHistoryBackupResponse"
mdx:
  format: md
---

# Type Alias: TakeHistoryBackupResponse

```ts
type TakeHistoryBackupResponse = object;
```

TakeHistoryBackupResponse

Response body for taking a history backup.

## Properties

### backupId

```ts
backupId: BackupId;
```

The id of the backup that has been scheduled.

---

### scheduledSnapshots

```ts
scheduledSnapshots: string[];
```

The names of the snapshots that have been scheduled for this backup.
