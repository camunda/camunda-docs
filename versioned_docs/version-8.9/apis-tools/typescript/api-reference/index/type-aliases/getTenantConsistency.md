---
title: "Type Alias: getTenantConsistency"
sidebar_label: "getTenantConsistency"
mdx:
  format: md
---

# Type Alias: getTenantConsistency

```ts
type getTenantConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getTenant>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
