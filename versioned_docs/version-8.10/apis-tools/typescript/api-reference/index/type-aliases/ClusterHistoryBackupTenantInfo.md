---
title: "Type Alias: ClusterHistoryBackupTenantInfo"
sidebar_label: "ClusterHistoryBackupTenantInfo"
mdx:
  format: md
---

# Type Alias: ClusterHistoryBackupTenantInfo

```ts
type ClusterHistoryBackupTenantInfo = object;
```

What a single physical tenant reports for a history backup id.

## Properties

### details

```ts
details: HistoryBackupSnapshotInfo[];
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
