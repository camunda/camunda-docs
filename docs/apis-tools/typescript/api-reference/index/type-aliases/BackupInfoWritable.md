---
title: "Type Alias: BackupInfoWritable"
sidebar_label: "BackupInfoWritable"
mdx:
  format: md
---

# Type Alias: BackupInfoWritable

```ts
type BackupInfoWritable = object;
```

Backup Info

Detailed status of a runtime backup. The aggregated state is computed from the backup
state of each partition as:

- If the backup of all partitions is 'COMPLETED', the overall state is 'COMPLETED'.
- If one partition is 'FAILED', the overall state is 'FAILED'.
- Otherwise, if one partition is 'DOES_NOT_EXIST', the overall state is 'INCOMPLETE'.
- Otherwise, if one partition is 'IN_PROGRESS', the overall state is 'IN_PROGRESS'.

## Properties

### failureReason

```ts
failureReason: string | null;
```

Reason for failure if the state is 'FAILED'.
