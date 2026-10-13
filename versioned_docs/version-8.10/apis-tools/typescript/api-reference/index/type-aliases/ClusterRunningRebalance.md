---
title: "Type Alias: ClusterRunningRebalance"
sidebar_label: "ClusterRunningRebalance"
mdx:
  format: md
---

# Type Alias: ClusterRunningRebalance

```ts
type ClusterRunningRebalance = ClusterRebalance & object;
```

The rebalance currently running.

## Type Declaration

### cancelRequested

```ts
cancelRequested: boolean;
```

Whether cancellation has been requested.

### dryRun

```ts
dryRun: boolean;
```

Whether this rebalance is a dry run.
