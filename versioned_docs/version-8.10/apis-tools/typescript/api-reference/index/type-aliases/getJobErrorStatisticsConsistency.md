---
title: "Type Alias: getJobErrorStatisticsConsistency"
sidebar_label: "getJobErrorStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getJobErrorStatisticsConsistency

```ts
type getJobErrorStatisticsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getJobErrorStatistics>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
