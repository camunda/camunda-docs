---
title: "Type Alias: searchAuditLogsConsistency"
sidebar_label: "searchAuditLogsConsistency"
mdx:
  format: md
---

# Type Alias: searchAuditLogsConsistency

```ts
type searchAuditLogsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchAuditLogs>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
