---
title: "Type Alias: ClusterRestorePlannedChange"
sidebar_label: "ClusterRestorePlannedChange"
mdx:
  format: md
---

# Type Alias: ClusterRestorePlannedChange

```ts
type ClusterRestorePlannedChange = object;
```

The operations of a restore that apply to one physical tenant.

## Properties

### operations

```ts
operations: ClusterRestoreOperation[];
```

The ordered list of operations that will be applied to the physical tenant.

---

### physicalTenantId

```ts
physicalTenantId: string | null;
```

The physical tenant the operations apply to; null for operations that are not scoped to a single physical tenant, such as broker lifecycle operations.
