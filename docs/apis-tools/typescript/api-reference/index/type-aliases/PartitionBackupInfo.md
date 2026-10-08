---
title: "Type Alias: PartitionBackupInfo"
sidebar_label: "PartitionBackupInfo"
mdx:
  format: md
---

# Type Alias: PartitionBackupInfo

```ts
type PartitionBackupInfo = object;
```

Partition Backup Info

Detailed info of the backup for a given partition.

## Properties

### brokerId

```ts
readonly brokerId: number | null;
```

The id of the broker from which the backup was taken for this partition.

---

### brokerVersion

```ts
readonly brokerVersion: string | null;
```

The version of the broker from which the backup was taken for this partition.

---

### checkpointPosition

```ts
readonly checkpointPosition: number | null;
```

The position of the checkpoint for this backup.

---

### createdAt

```ts
readonly createdAt: string | null;
```

The timestamp at which the backup was started on this partition.

---

### failureReason

```ts
failureReason: string | null;
```

Failure reason if the state is 'FAILED'.

---

### firstLogPosition

```ts
readonly firstLogPosition: number | null;
```

The first log position included in this backup.

---

### lastUpdatedAt

```ts
readonly lastUpdatedAt: string | null;
```

The timestamp at which the backup was last updated on this partition, e.g. changed
state from 'IN_PROGRESS' to 'COMPLETED'.

---

### partitionId

```ts
partitionId: PartitionId;
```

The id of the partition.

---

### snapshotId

```ts
readonly snapshotId: string | null;
```

The id of the snapshot which is included in this backup.

---

### state

```ts
state: StateCode;
```

The state of the backup on this partition.
