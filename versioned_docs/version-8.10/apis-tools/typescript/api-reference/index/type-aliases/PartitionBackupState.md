---
title: "Type Alias: PartitionBackupState"
sidebar_label: "PartitionBackupState"
mdx:
  format: md
---

# Type Alias: PartitionBackupState

```ts
type PartitionBackupState = object;
```

Partition Backup State

Detailed information about the backup state for a given partition.

## Properties

### checkpointId

```ts
checkpointId: CheckpointId;
```

The id of the checkpoint this backup is based on.

---

### checkpointPosition

```ts
checkpointPosition: number;
```

The log position of the checkpoint this backup is based on.

---

### checkpointTimestamp

```ts
checkpointTimestamp: string;
```

The timestamp at which the checkpoint was created.

---

### checkpointType

```ts
checkpointType: BackupType;
```

The type of the backup.

---

### firstLogPosition

```ts
firstLogPosition: number;
```

The first log position included in this backup.

---

### partitionId

```ts
partitionId: PartitionId | null;
```

The id of the partition. Omitted when nested inside a backup range's `start`/`end`,
where the partition is already identified by the enclosing range.
