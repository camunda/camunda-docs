---
title: "Type Alias: GetHistoryBackupAsClusterAdminData"
sidebar_label: "GetHistoryBackupAsClusterAdminData"
mdx:
  format: md
---

# Type Alias: GetHistoryBackupAsClusterAdminData

```ts
type GetHistoryBackupAsClusterAdminData = object;
```

## Properties

### body?

```ts
body?: never;
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
query?: object;
```

#### physicalTenantId?

```ts
physicalTenantId?: string;
```

The physical tenant to apply the change to. When omitted, or when passed with an empty value, the change is applied to every physical tenant of the cluster.

---

### url

```ts
url: "/cluster/v2/backups/history/{backupId}";
```
