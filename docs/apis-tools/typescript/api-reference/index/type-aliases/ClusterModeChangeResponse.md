---
title: "Type Alias: ClusterModeChangeResponse"
sidebar_label: "ClusterModeChangeResponse"
mdx:
  format: md
---

# Type Alias: ClusterModeChangeResponse

```ts
type ClusterModeChangeResponse = object;
```

The planned changes resulting from a cluster mode transition request.

## Properties

### changeId

```ts
changeId: string;
```

The ID of the cluster change that was triggered by the request.

---

### plannedChanges

```ts
plannedChanges: ClusterModeChangePlannedChange[];
```

The operations that will be applied to complete the change, grouped by the physical tenant they belong to. Groups are transitioned in parallel; the operations within a group are applied in the given order.
