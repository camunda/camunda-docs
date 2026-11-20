---
title: "Type Alias: ClusterModeChangePlannedChange"
sidebar_label: "ClusterModeChangePlannedChange"
mdx:
  format: md
---

# Type Alias: ClusterModeChangePlannedChange

```ts
type ClusterModeChangePlannedChange = object;
```

The operations of a cluster mode change that apply to one physical tenant.

## Properties

### operations

```ts
operations: ClusterModeChangeOperation[];
```

The ordered list of operations that will be applied to the physical tenant.

---

### physicalTenantId

```ts
physicalTenantId: string | null;
```

The physical tenant the operations apply to; null for operations that are not scoped to a single physical tenant, such as broker lifecycle operations.
