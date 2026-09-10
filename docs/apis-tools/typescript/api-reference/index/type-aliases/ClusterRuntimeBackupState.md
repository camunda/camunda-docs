---
title: "Type Alias: ClusterRuntimeBackupState"
sidebar_label: "ClusterRuntimeBackupState"
mdx:
  format: md
---

# Type Alias: ClusterRuntimeBackupState

```ts
type ClusterRuntimeBackupState = object;
```

The checkpoint and backup state of each physical tenant. Nothing is aggregated across tenants: checkpoint ids and log positions only mean anything within one tenant's partitions.

## Properties

### physicalTenants

```ts
physicalTenants: ClusterRuntimeBackupTenantState[];
```

The runtime backup state of each targeted physical tenant, ordered by physical tenant id.
