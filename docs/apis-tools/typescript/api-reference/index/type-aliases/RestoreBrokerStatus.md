---
title: "Type Alias: RestoreBrokerStatus"
sidebar_label: "RestoreBrokerStatus"
mdx:
  format: md
---

# Type Alias: RestoreBrokerStatus

```ts
type RestoreBrokerStatus = object;
```

The restore status of a single broker.

## Properties

### brokerId

```ts
brokerId: string;
```

The ID of the broker, including its zone if it belongs to one.

---

### partitions

```ts
partitions: RestorePartitionStatus[];
```

The per-partition restore status for this broker.

---

### partitionsRestored

```ts
partitionsRestored: number;
```

The number of the broker's partitions that have been restored so far.

---

### partitionsToRestore

```ts
partitionsToRestore: number;
```

The total number of the broker's partitions to restore.
