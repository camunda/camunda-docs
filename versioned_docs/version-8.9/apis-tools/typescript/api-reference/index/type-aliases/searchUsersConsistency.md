---
title: "Type Alias: searchUsersConsistency"
sidebar_label: "searchUsersConsistency"
mdx:
  format: md
---

# Type Alias: searchUsersConsistency

```ts
type searchUsersConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsers>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
