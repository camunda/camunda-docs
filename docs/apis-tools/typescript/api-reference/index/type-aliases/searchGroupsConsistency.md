---
title: "Type Alias: searchGroupsConsistency"
sidebar_label: "searchGroupsConsistency"
mdx:
  format: md
---

# Type Alias: searchGroupsConsistency

```ts
type searchGroupsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchGroups>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
