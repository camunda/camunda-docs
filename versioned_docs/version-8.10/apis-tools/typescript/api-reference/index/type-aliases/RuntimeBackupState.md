---
title: "Type Alias: RuntimeBackupState"
sidebar_label: "RuntimeBackupState"
mdx:
  format: md
---

# Type Alias: RuntimeBackupState

```ts
type RuntimeBackupState = object;
```

Runtime Backup State

Information about the checkpoint and backup state of the physical tenant.

## Properties

### backupStates

```ts
backupStates: PartitionBackupState[];
```

List of partition backup states.

---

### checkpointStates

```ts
checkpointStates: PartitionCheckpointState[];
```

List of partition checkpoint states.

---

### ranges

```ts
ranges: PartitionBackupRange[];
```

List of partition backup ranges.
