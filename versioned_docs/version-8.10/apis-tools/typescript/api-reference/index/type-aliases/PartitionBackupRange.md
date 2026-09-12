---
title: "Type Alias: PartitionBackupRange"
sidebar_label: "PartitionBackupRange"
mdx:
  format: md
---

# Type Alias: PartitionBackupRange

```ts
type PartitionBackupRange = object;
```

Partition Backup Range

Information about one backup range for a partition.

## Properties

### end

```ts
end: PartitionBackupState | null;
```

The newest backup in the range.

---

### partitionId

```ts
partitionId: PartitionId;
```

The id of the partition.

---

### start

```ts
start: PartitionBackupState | null;
```

The oldest backup in the range.
