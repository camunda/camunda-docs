---
title: "Type Alias: getAuditLogConsistency"
sidebar_label: "getAuditLogConsistency"
mdx:
  format: md
---

# Type Alias: getAuditLogConsistency

```ts
type getAuditLogConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getAuditLog>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
