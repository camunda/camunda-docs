---
title: "Type Alias: searchUsersForGroupConsistency"
sidebar_label: "searchUsersForGroupConsistency"
mdx:
  format: md
---

# Type Alias: searchUsersForGroupConsistency

```ts
type searchUsersForGroupConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsersForGroup>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
