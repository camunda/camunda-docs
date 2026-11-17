---
title: "Type Alias: GetRuntimeBackupAsClusterAdminResponses"
sidebar_label: "GetRuntimeBackupAsClusterAdminResponses"
mdx:
  format: md
---

# Type Alias: GetRuntimeBackupAsClusterAdminResponses

```ts
type GetRuntimeBackupAsClusterAdminResponses = object;
```

## Properties

### 200

```ts
200: ClusterRuntimeBackupInfo;
```

Every targeted physical tenant was read, and at least one holds the backup. Each tenant reports either the backup or `DOES_NOT_EXIST`.
