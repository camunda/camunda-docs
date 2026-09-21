---
title: "Type Alias: DeleteHistoryBackupData"
sidebar_label: "DeleteHistoryBackupData"
mdx:
  format: md
---

# Type Alias: DeleteHistoryBackupData

```ts
type DeleteHistoryBackupData = object;
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
url: "/backups/history/{backupId}";
```
