---
title: "Type Alias: getJobWorkerStatisticsConsistency"
sidebar_label: "getJobWorkerStatisticsConsistency"
mdx:
  format: md
---

# Type Alias: getJobWorkerStatisticsConsistency

```ts
type getJobWorkerStatisticsConsistency = object;
```

Management of eventual consistency \*

## Properties

### consistency

```ts
consistency: ConsistencyOptions<_DataOf<typeof Sdk.getJobWorkerStatistics>>;
```

Management of eventual consistency tolerance. Set waitUpToMs to 0 to ignore eventual consistency. pollInterval is 500ms by default.
