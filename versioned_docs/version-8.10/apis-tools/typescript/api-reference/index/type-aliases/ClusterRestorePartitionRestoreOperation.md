---
title: "Type Alias: ClusterRestorePartitionRestoreOperation"
sidebar_label: "ClusterRestorePartitionRestoreOperation"
mdx:
  format: md
---

# Type Alias: ClusterRestorePartitionRestoreOperation

```ts
type ClusterRestorePartitionRestoreOperation = object;
```

The operation that restores a single partition from the backups resolved for it.

## Properties

### backupIds

```ts
backupIds: number[];
```

The IDs of the backups the partition is restored from.

---

### brokerId

```ts
brokerId: string;
```

The ID of the broker that applies the operation, including its zone if it belongs to one.

---

### operation

```ts
operation: string;
```

The type of the operation.

---

### partitionId

```ts
partitionId: number;
```

The partition the operation restores.
