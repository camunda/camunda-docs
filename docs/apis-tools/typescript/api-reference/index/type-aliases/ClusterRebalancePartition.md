---
title: "Type Alias: ClusterRebalancePartition"
sidebar_label: "ClusterRebalancePartition"
mdx:
  format: md
---

# Type Alias: ClusterRebalancePartition

```ts
type ClusterRebalancePartition = object;
```

One partition's leadership/balance status - its current leader, its desired leader, and whether a rebalance is currently moving it.

## Properties

### currentLeader

```ts
currentLeader: string | null;
```

The broker ID currently leading this partition, or absent if it has no leader.

---

### desiredLeader

```ts
desiredLeader: string;
```

The broker ID the current configuration wants to lead this partition.

---

### partitionId

```ts
partitionId: number;
```

The unique ID of this partition, within its physical tenant.

---

### physicalTenantId

```ts
physicalTenantId: string;
```

The partition group this partition belongs to. Partition IDs are unique only within a group, so this is needed to identify the partition.

---

### state

```ts
state: "TRANSFERRING" | "UNBALANCED" | "BALANCED";
```

Whether this partition is being actively transferred, unbalanced, or balanced.
