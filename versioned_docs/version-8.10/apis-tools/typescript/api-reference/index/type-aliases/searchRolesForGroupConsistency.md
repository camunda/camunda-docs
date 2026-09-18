---
title: "Type Alias: searchRolesForGroupConsistency"
sidebar_label: "searchRolesForGroupConsistency"
mdx:
  format: md
---

# Type Alias: searchRolesForGroupConsistency

```ts
type searchRolesForGroupConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchRolesForGroup>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
