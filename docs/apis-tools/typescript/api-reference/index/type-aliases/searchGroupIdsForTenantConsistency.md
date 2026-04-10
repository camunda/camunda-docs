---
title: "Type Alias: searchGroupIdsForTenantConsistency"
sidebar_label: "searchGroupIdsForTenantConsistency"
mdx:
  format: md
---

# Type Alias: searchGroupIdsForTenantConsistency

```ts
type searchGroupIdsForTenantConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchGroupIdsForTenant>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
