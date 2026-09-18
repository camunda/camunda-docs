---
title: "Type Alias: searchUsersForRoleConsistency"
sidebar_label: "searchUsersForRoleConsistency"
mdx:
  format: md
---

# Type Alias: searchUsersForRoleConsistency

```ts
type searchUsersForRoleConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchUsersForRole>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
