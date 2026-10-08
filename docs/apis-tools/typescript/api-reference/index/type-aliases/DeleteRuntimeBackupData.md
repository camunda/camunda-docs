---
title: "Type Alias: DeleteRuntimeBackupData"
sidebar_label: "DeleteRuntimeBackupData"
mdx:
  format: md
---

# Type Alias: DeleteRuntimeBackupData

```ts
type DeleteRuntimeBackupData = object;
```

## Properties

### body?

```ts
optional body?: never;
```

---

### path

```ts
path: object;
```

#### backupId

```ts
backupId: BackupId;
```

The id of the backup.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/backups/runtime/{backupId}";
```
