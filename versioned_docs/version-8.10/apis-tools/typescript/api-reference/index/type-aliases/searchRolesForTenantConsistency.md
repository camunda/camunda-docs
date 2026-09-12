---
title: "Type Alias: searchRolesForTenantConsistency"
sidebar_label: "searchRolesForTenantConsistency"
mdx:
  format: md
---

# Type Alias: searchRolesForTenantConsistency

```ts
type searchRolesForTenantConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchRolesForTenant>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
