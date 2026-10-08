---
title: "Type Alias: ClusterRuntimeBackupTenantState"
sidebar_label: "ClusterRuntimeBackupTenantState"
mdx:
  format: md
---

# Type Alias: ClusterRuntimeBackupTenantState

```ts
type ClusterRuntimeBackupTenantState = object;
```

The checkpoint and backup state of one physical tenant.

## Properties

### physicalTenantId

```ts
physicalTenantId: string;
```

The id of the physical tenant.

---

### state

```ts
state: RuntimeBackupState;
```

The checkpoint and backup state of this physical tenant's partitions.
