---
title: "Type Alias: ListRuntimeBackupsAsClusterAdminResponses"
sidebar_label: "ListRuntimeBackupsAsClusterAdminResponses"
mdx:
  format: md
---

# Type Alias: ListRuntimeBackupsAsClusterAdminResponses

```ts
type ListRuntimeBackupsAsClusterAdminResponses = object;
```

## Properties

### 200

```ts
200: ClusterRuntimeBackupInfo[];
```

The runtime backups of every targeted physical tenant, grouped by backup id and sorted in descending order of backup id, as the per-physical-tenant listing is. Empty when every targeted tenant was read and none of them holds a matching backup.
