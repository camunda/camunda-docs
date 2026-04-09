---
title: "Type Alias: searchDecisionInstancesConsistency"
sidebar_label: "searchDecisionInstancesConsistency"
mdx:
  format: md
---

# Type Alias: searchDecisionInstancesConsistency

```ts
type searchDecisionInstancesConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.searchDecisionInstances>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
