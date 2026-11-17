---
title: "Type Alias: GetHistoryBackupData"
sidebar_label: "GetHistoryBackupData"
mdx:
  format: md
---

# Type Alias: GetHistoryBackupData

```ts
type GetHistoryBackupData = object;
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
