---
title: "Type Alias: HistoryBackupSnapshotInfo"
sidebar_label: "HistoryBackupSnapshotInfo"
mdx:
  format: md
---

# Type Alias: HistoryBackupSnapshotInfo

```ts
type HistoryBackupSnapshotInfo = object;
```

History Backup Snapshot Info

Detailed info of a single snapshot making up a history backup.

## Properties

### failures

```ts
readonly failures: string[];
```

The failures reported for this snapshot. Empty if there were none.

---

### snapshotName

```ts
readonly snapshotName: string;
```

The name of the snapshot.

---

### startTime

```ts
readonly startTime: string | null;
```

The timestamp at which the snapshot was started. Not reported when the backup was
listed without snapshot detail.

---

### state

```ts
readonly state: string | null;
```

The state of the snapshot, reported verbatim by the secondary storage (for example
'SUCCESS', 'IN_PROGRESS' or 'PARTIAL'). Deliberately not a closed set: Elasticsearch
and OpenSearch report different vocabularies. Not reported when the backup was
listed without snapshot detail.
