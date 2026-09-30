---
title: "Type Alias: ClusterRuntimeBackupInfo"
sidebar_label: "ClusterRuntimeBackupInfo"
mdx:
  format: md
---

# Type Alias: ClusterRuntimeBackupInfo

```ts
type ClusterRuntimeBackupInfo = object;
```

A runtime backup id, what each physical tenant reports for it, and the state aggregated over every targeted tenant — folded from the per-tenant states by the same rules a per-tenant state is folded from its partitions.

## Properties

### backupId

```ts
backupId: BackupId;
```

The id of the backup.

---

### failureReason

```ts
failureReason: string | null;
```

Reason for failure if the aggregated state is 'FAILED'.

---

### physicalTenants

```ts
physicalTenants: ClusterRuntimeBackupTenantInfo[];
```

What each physical tenant reports for this backup id, ordered by physical tenant id. Every targeted tenant is listed, including the ones reporting `DOES_NOT_EXIST`.

---

### state

```ts
state: StateCode;
```

The state aggregated over every targeted physical tenant, whether the backup id was looked up directly or listed. A tenant holding nothing for this id counts as `DOES_NOT_EXIST`, so the aggregate is `INCOMPLETE` unless every targeted tenant holds the backup.
