---
title: "Type Alias: searchClientsForGroupConsistency"
sidebar_label: "searchClientsForGroupConsistency"
mdx:
  format: md
---

# Type Alias: searchClientsForGroupConsistency

```ts
type searchClientsForGroupConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchClientsForGroup>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
