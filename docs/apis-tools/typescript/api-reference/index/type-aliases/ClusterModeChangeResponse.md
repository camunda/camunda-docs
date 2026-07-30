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
plannedChanges: ClusterModeChangeOperation[];
```

The ordered list of operations that will be applied to complete the change.
