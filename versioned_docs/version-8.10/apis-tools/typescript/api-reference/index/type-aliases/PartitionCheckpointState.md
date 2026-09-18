---
title: "Type Alias: PartitionCheckpointState"
sidebar_label: "PartitionCheckpointState"
mdx:
  format: md
---

# Type Alias: PartitionCheckpointState

```ts
type PartitionCheckpointState = object;
```

Partition Checkpoint State

Detailed information about the checkpoint state for a given partition.

## Properties

### checkpointId

```ts
checkpointId: CheckpointId;
```

The id of the checkpoint.

---

### checkpointPosition

```ts
checkpointPosition: number;
```

The log position of the checkpoint.

---

### checkpointTimestamp

```ts
checkpointTimestamp: string;
```

The timestamp at which the checkpoint was created.

---

### checkpointType

```ts
checkpointType: CheckpointType;
```

The type of the checkpoint.

---

### partitionId

```ts
partitionId: PartitionId;
```

The id of the partition.
