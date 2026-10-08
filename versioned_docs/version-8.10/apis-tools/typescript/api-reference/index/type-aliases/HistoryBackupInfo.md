---
title: "Type Alias: HistoryBackupInfo"
sidebar_label: "HistoryBackupInfo"
mdx:
  format: md
---

# Type Alias: HistoryBackupInfo

```ts
type HistoryBackupInfo = object;
```

History Backup Info

Detailed status of a history backup. The aggregated state is computed from the state of
each of its snapshots as:

- If every expected snapshot exists and all are complete, the overall state is
  'COMPLETED'.
- If one snapshot failed or is partial, the overall state is 'FAILED'.
- Otherwise, if one snapshot is incompatible, the overall state is 'INCOMPATIBLE'.
- Otherwise, if one snapshot is still running, the overall state is 'IN_PROGRESS'.
- Otherwise, if snapshots are missing and the backup has not progressed within the
  configured timeout, the overall state is 'INCOMPLETE'.

## Properties

### backupId

```ts
backupId: BackupId;
```

The id of the backup.

---

### details

```ts
readonly details: HistoryBackupSnapshotInfo[];
```

Detailed status of the backup per snapshot. Always lists every snapshot found for
the backup; when the backup was read without snapshot detail, each entry carries
only its name.

---

### failureReason

```ts
failureReason: string | null;
```

Reason for failure if the state is 'FAILED'.

---

### state

```ts
state: HistoryBackupStateCode;
```

The aggregated state of the backup.
