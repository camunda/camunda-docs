---
title: "Type Alias: ClusterRestoreResponse"
sidebar_label: "ClusterRestoreResponse"
mdx:
  format: md
---

# Type Alias: ClusterRestoreResponse

```ts
type ClusterRestoreResponse = object;
```

The planned changes resulting from a restore request.

## Properties

### changeId

```ts
changeId: string;
```

The ID of the cluster change that was triggered by the request.

---

### plannedChanges

```ts
plannedChanges: ClusterRestorePlannedChange[];
```

The operations that will be applied to complete the restore, grouped by the physical tenant they belong to. Groups are restored in parallel; the operations within a group are applied in the given order.
