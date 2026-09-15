---
title: "Type Alias: BackupId"
sidebar_label: "BackupId"
mdx:
  format: md
---

# Type Alias: BackupId

```ts
type BackupId = number;
```

Backup ID

The id of the backup. Must be a positive numerical value. As backups are logically
ordered by their ids (ascending), each successive backup must use a higher id than the
previous one.
