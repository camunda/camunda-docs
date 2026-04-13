---
title: "Type Alias: Partition"
sidebar_label: "Partition"
mdx:
  format: md
---

# Type Alias: Partition

```ts
type Partition = object;
```

Provides information on a partition within a broker node.

## Properties

### health

```ts
health: "healthy" | "unhealthy" | "dead";
```

Describes the current health of the partition.

---

### partitionId

```ts
partitionId: number;
```

The unique ID of this partition.

---

### role

```ts
role: "leader" | "follower" | "inactive";
```

Describes the Raft role of the broker for a given partition.
