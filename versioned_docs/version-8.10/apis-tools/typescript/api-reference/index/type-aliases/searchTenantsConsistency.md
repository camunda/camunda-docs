---
title: "Type Alias: searchTenantsConsistency"
sidebar_label: "searchTenantsConsistency"
mdx:
  format: md
---

# Type Alias: searchTenantsConsistency

```ts
type searchTenantsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchTenants>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
