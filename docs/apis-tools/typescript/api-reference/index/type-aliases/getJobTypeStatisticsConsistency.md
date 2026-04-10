---
title: "Type Alias: getJobTypeStatisticsConsistency"
sidebar_label: "getJobTypeStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getJobTypeStatisticsConsistency

```ts
type getJobTypeStatisticsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getJobTypeStatistics>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
