---
title: "Type Alias: getJobTimeSeriesStatisticsConsistency"
sidebar_label: "getJobTimeSeriesStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getJobTimeSeriesStatisticsConsistency

```ts
type getJobTimeSeriesStatisticsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getJobTimeSeriesStatistics>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
