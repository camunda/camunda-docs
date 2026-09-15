---
title: "Type Alias: HistoryBackupStateCode"
sidebar_label: "HistoryBackupStateCode"
mdx:
  format: md
---

# Type Alias: HistoryBackupStateCode

```ts
type HistoryBackupStateCode =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "INCOMPLETE"
  | "INCOMPATIBLE";
```

History Backup State

The aggregated state of a history backup, computed from the state of each of its
snapshots.
