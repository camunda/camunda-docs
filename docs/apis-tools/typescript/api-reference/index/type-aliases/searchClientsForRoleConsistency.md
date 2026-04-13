---
title: "Type Alias: searchClientsForRoleConsistency"
sidebar_label: "searchClientsForRoleConsistency"
mdx:
  format: md
---

# Type Alias: searchClientsForRoleConsistency

```ts
type searchClientsForRoleConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClientsForRole>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
