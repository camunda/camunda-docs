---
title: "Type Alias: searchUserTaskAuditLogsConsistency"
sidebar_label: "searchUserTaskAuditLogsConsistency"
mdx:
  format: md
---

# Type Alias: searchUserTaskAuditLogsConsistency

```ts
type searchUserTaskAuditLogsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUserTaskAuditLogs>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
