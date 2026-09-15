---
title: "Type Alias: GetHistoryBackupAsClusterAdminResponses"
sidebar_label: "GetHistoryBackupAsClusterAdminResponses"
mdx:
  format: md
---

# Type Alias: GetHistoryBackupAsClusterAdminResponses

```ts
type GetHistoryBackupAsClusterAdminResponses = object;
```

## Properties

### 200

```ts
200: ClusterHistoryBackupInfo;
```

Every targeted physical tenant was read. Each one reports either the backup or `NOT_FOUND`; at least one holds the backup.
