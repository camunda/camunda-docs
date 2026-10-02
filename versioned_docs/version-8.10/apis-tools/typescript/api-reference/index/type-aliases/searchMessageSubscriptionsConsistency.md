---
title: "Type Alias: searchMessageSubscriptionsConsistency"
sidebar_label: "searchMessageSubscriptionsConsistency"
mdx:
  format: md
---

# Type Alias: searchMessageSubscriptionsConsistency

```ts
type searchMessageSubscriptionsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchMessageSubscriptions>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
