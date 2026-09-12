---
title: "Type Alias: ClusterBalanceResponse"
sidebar_label: "ClusterBalanceResponse"
mdx:
  format: md
---

# Type Alias: ClusterBalanceResponse

```ts
type ClusterBalanceResponse = object;
```

The cluster's current per-partition balance state, the running rebalance, and the last completed rebalance.

## Properties

### lastCompletedRebalance

```ts
lastCompletedRebalance: ClusterCompletedRebalance | null;
```

The last completed non-dry-run rebalance this coordinator finished.

---

### partitions

```ts
partitions: ClusterRebalancePartition[];
```

The balance state of each partition as of the time of the request.

---

### runningRebalance

```ts
runningRebalance: ClusterRunningRebalance | null;
```

Normally the rebalance currently running, or absent if no rebalance is running. For a dry-run response, this is instead the unexecuted plan of that dry run.

---

### state

```ts
state: "BALANCED" | "BALANCING" | "UNBALANCED";
```

The cluster's aggregate balance state as of the time of the request.
