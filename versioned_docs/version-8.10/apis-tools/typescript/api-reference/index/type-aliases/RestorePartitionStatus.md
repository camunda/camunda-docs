---
title: "Type Alias: RestorePartitionStatus"
sidebar_label: "RestorePartitionStatus"
mdx:
  format: md
---

# Type Alias: RestorePartitionStatus

```ts
type RestorePartitionStatus = object;
```

The restore status of a single partition on a broker.

## Properties

### backupIds

```ts
backupIds: number[];
```

The IDs of the backups this partition is restored from.

---

### completedAt

```ts
completedAt: string | null;
```

The time the partition was restored, as an ISO 8601 timestamp; null unless the partition state is `RESTORED`.

---

### partitionId

```ts
partitionId: number;
```

The ID of the partition.

---

### state

```ts
state: "PENDING" | "RESTORING" | "RESTORED";
```

The restore state of the partition.
