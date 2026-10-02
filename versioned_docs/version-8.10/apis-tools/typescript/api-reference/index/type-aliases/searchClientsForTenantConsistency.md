---
title: "Type Alias: searchClientsForTenantConsistency"
sidebar_label: "searchClientsForTenantConsistency"
mdx:
  format: md
---

# Type Alias: searchClientsForTenantConsistency

```ts
type searchClientsForTenantConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClientsForTenant>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
