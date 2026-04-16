---
title: "Type Alias: searchRolesConsistency"
sidebar_label: "searchRolesConsistency"
mdx:
  format: md
---

# Type Alias: searchRolesConsistency

```ts
type searchRolesConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchRoles>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
