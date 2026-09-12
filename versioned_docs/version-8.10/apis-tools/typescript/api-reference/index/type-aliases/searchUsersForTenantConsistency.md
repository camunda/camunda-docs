---
title: "Type Alias: searchUsersForTenantConsistency"
sidebar_label: "searchUsersForTenantConsistency"
mdx:
  format: md
---

# Type Alias: searchUsersForTenantConsistency

```ts
type searchUsersForTenantConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsersForTenant>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
