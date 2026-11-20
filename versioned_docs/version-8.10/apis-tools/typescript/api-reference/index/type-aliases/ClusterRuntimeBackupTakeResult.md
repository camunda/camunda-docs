---
title: "Type Alias: ClusterRuntimeBackupTakeResult"
sidebar_label: "ClusterRuntimeBackupTakeResult"
mdx:
  format: md
---

# Type Alias: ClusterRuntimeBackupTakeResult

```ts
type ClusterRuntimeBackupTakeResult = object;
```

Whether one physical tenant's runtime backup was triggered, and under which id it can be monitored and deleted.

## Properties

### backupId

```ts
backupId: BackupId | null;
```

The id to monitor or delete this physical tenant's backup by: the id it is running under when `TRIGGERED` — the requested one, or the one the tenant generated when ids are generated — and the requested id to check when `UNKNOWN`. Null when the tenant is known to be running no backup, and also when an `UNKNOWN` tenant generates its own ids, because the id it may be running under was never reported; list that tenant's backups to find it.

---

### outcome

```ts
outcome: ClusterRuntimeBackupTakeOutcome;
```

What this physical tenant did with the trigger.

---

### physicalTenantId

```ts
physicalTenantId: string;
```

The id of the physical tenant.

---

### reason

```ts
reason: string | null;
```

Why this physical tenant reported no triggered backup. Null when it was triggered.
