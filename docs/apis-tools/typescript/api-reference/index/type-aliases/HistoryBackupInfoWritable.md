---
title: "Type Alias: HistoryBackupInfoWritable"
sidebar_label: "HistoryBackupInfoWritable"
mdx:
  format: md
---

# Type Alias: HistoryBackupInfoWritable

```ts
type HistoryBackupInfoWritable = object;
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

### failureReason

```ts
failureReason: string | null;
```

Reason for failure if the state is 'FAILED'.
