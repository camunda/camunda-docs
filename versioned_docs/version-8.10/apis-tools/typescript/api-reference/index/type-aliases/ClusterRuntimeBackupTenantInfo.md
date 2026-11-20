---
title: "Type Alias: ClusterRuntimeBackupTenantInfo"
sidebar_label: "ClusterRuntimeBackupTenantInfo"
mdx:
  format: md
---

# Type Alias: ClusterRuntimeBackupTenantInfo

```ts
type ClusterRuntimeBackupTenantInfo = object;
```

What a single physical tenant reports for a runtime backup id.

## Properties

### details

```ts
details: PartitionBackupInfo[];
```

Detailed status of the backup per partition of this physical tenant. Contains every partition of the tenant when the backup id was looked up directly, including for a tenant that holds no such backup. Empty for a tenant that holds nothing for a listed id: a listing asks each tenant for the backups it has, so there is nothing to report per partition for one it does not.

---

### failureReason

```ts
failureReason: string | null;
```

Reason for failure if the state is 'FAILED'.

---

### physicalTenantId

```ts
physicalTenantId: string;
```

The id of the physical tenant.

---

### state

```ts
state: StateCode;
```

The state of the backup on this physical tenant, aggregated over its partitions.
