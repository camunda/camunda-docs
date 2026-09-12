---
title: "Type Alias: ClusterRestoreOperation"
sidebar_label: "ClusterRestoreOperation"
mdx:
  format: md
---

# Type Alias: ClusterRestoreOperation

```ts
type ClusterRestoreOperation =
  | (object & ClusterRestoreBrokerOperation)
  | (object & ClusterRestorePartitionOperation)
  | (object & ClusterRestorePartitionRestoreOperation)
  | (object & ClusterRestoreModeChangeOperation)
  | (object & ClusterRestoreAwaitModeChangeOperation);
```

A single operation that is part of a restore. Every operation names the broker that applies it; the rest of its properties depend on what the operation does, so it is reported as one of the variants below, distinguished by `operation`. A property a variant does not declare is absent from the response rather than reported as null.
