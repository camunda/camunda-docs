---
title: "Type Alias: ClusterRestoreRequest"
sidebar_label: "ClusterRestoreRequest"
mdx:
  format: md
---

# Type Alias: ClusterRestoreRequest

```ts
type ClusterRestoreRequest = RestoreRequest & object;
```

Describes a restore request issued by a cluster admin. The backup selection at the top level applies to every targeted physical tenant, except for the ones listed in `overrides`.

## Type Declaration

### overrides?

```ts
optional overrides?:
  | {
[key: string]: RestoreRequest;
}
  | null;
```

The backup selection to apply to individual physical tenants, keyed by physical tenant id. Only allowed for a cluster-wide restore, that is when no `physicalTenantId` parameter is given.
