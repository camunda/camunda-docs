---
title: "Type Alias: ClusterRebalance"
sidebar_label: "ClusterRebalance"
mdx:
  format: md
---

# Type Alias: ClusterRebalance

```ts
type ClusterRebalance = object;
```

The fields common to a running and a completed rebalance.

## Properties

### partitions

```ts
partitions: ClusterRebalanceOperationPartition[];
```

Every partition in the rebalance plan and its progress within this rebalance.

---

### rebalanceId

```ts
rebalanceId: number;
```

The ID of this rebalance.

---

### startedAt

```ts
startedAt: string;
```

When this rebalance was created.
