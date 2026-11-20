---
title: "Type Alias: ListHistoryBackupsAsClusterAdminResponses"
sidebar_label: "ListHistoryBackupsAsClusterAdminResponses"
mdx:
  format: md
---

# Type Alias: ListHistoryBackupsAsClusterAdminResponses

```ts
type ListHistoryBackupsAsClusterAdminResponses = object;
```

## Properties

### 200

```ts
200: ClusterHistoryBackupInfo[];
```

The history backups of every targeted physical tenant, grouped by backup id and ordered by backup id, descending. Deliberately not the per-physical-tenant endpoint's order, which is by snapshot start time: start times are per tenant, so a group spanning several tenants has no single one to sort on. Descending id is only recency for ids that ascend with time. Empty when every targeted tenant was read and none of them holds a matching backup.
