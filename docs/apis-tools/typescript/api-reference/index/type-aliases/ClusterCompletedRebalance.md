---
title: "Type Alias: ClusterCompletedRebalance"
sidebar_label: "ClusterCompletedRebalance"
mdx:
  format: md
---

# Type Alias: ClusterCompletedRebalance

```ts
type ClusterCompletedRebalance = ClusterRebalance & object;
```

The last completed rebalance.

## Type Declaration

### finishedAt

```ts
finishedAt: string;
```

When this rebalance finished.

### result

```ts
result: "COMPLETED" | "CANCELLED" | "FAILED";
```

How the rebalance ended.
