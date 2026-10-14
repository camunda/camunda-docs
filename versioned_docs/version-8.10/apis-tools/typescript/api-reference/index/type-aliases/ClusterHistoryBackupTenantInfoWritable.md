---
title: "Type Alias: ClusterHistoryBackupTenantInfoWritable"
sidebar_label: "ClusterHistoryBackupTenantInfoWritable"
mdx:
  format: md
---

# Type Alias: ClusterHistoryBackupTenantInfoWritable

```ts
type ClusterHistoryBackupTenantInfoWritable = object;
```

What a single physical tenant reports for a history backup id.

## Properties

### details

```ts
details: unknown[];
```

Detailed status of the backup per snapshot on this physical tenant. Empty when the tenant does not hold the backup.

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
state: ClusterHistoryBackupTenantState;
```

The state of the backup on this physical tenant.
