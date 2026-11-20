---
title: "Type Alias: ClusterRestorePartitionOperation"
sidebar_label: "ClusterRestorePartitionOperation"
mdx:
  format: md
---

# Type Alias: ClusterRestorePartitionOperation

```ts
type ClusterRestorePartitionOperation = object;
```

A restore operation that targets a single partition without restoring it, such as the one that prepares the partition for its restore.

## Properties

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

The partition the operation applies to.
