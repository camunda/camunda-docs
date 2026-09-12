---
title: "Type Alias: searchCorrelatedMessageSubscriptionsConsistency"
sidebar_label: "searchCorrelatedMessageSubscriptionsConsistency"
mdx:
  format: md
---

# Type Alias: searchCorrelatedMessageSubscriptionsConsistency

```ts
type searchCorrelatedMessageSubscriptionsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<
  _DataOf<typeof Sdk.searchCorrelatedMessageSubscriptions>
>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
