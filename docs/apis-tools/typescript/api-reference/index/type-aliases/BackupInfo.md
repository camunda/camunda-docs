---
title: "Type Alias: BackupInfo"
sidebar_label: "BackupInfo"
mdx:
  format: md
---

# Type Alias: BackupInfo

```ts
type BackupInfo = object;
```

Backup Info

Detailed status of a runtime backup. The aggregated state is computed from the backup
state of each partition as:

- If the backup of all partitions is 'COMPLETED', the overall state is 'COMPLETED'.
- If one partition is 'FAILED', the overall state is 'FAILED'.
- Otherwise, if one partition is 'DOES_NOT_EXIST', the overall state is 'INCOMPLETE'.
- Otherwise, if one partition is 'IN_PROGRESS', the overall state is 'IN_PROGRESS'.

## Properties

### backupId

```ts
backupId: BackupId;
```

The id of the backup.

---

### details

```ts
readonly details: PartitionBackupInfo[];
```

Detailed status of the backup per partition. Always contains every partition of
the physical tenant.

---

### failureReason

```ts
failureReason: string | null;
```

Reason for failure if the state is 'FAILED'.

---

### state

```ts
state: StateCode;
```

The aggregated state of the backup.
