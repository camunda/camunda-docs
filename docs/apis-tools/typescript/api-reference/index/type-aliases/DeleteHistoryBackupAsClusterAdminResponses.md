---
title: "Type Alias: DeleteHistoryBackupAsClusterAdminResponses"
sidebar_label: "DeleteHistoryBackupAsClusterAdminResponses"
mdx:
  format: md
---

# Type Alias: DeleteHistoryBackupAsClusterAdminResponses

```ts
type DeleteHistoryBackupAsClusterAdminResponses = object;
```

## Properties

### 204

```ts
204: void;
```

No targeted physical tenant holds the backup any more, because it was deleted from every tenant that held it. At least one tenant held it.
