---
title: "Type Alias: getDecisionInstanceConsistency"
sidebar_label: "getDecisionInstanceConsistency"
mdx:
  format: md
---

# Type Alias: getDecisionInstanceConsistency

```ts
type getDecisionInstanceConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getDecisionInstance>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
