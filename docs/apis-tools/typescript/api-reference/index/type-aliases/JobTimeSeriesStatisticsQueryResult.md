---
title: "Type Alias: JobTimeSeriesStatisticsQueryResult"
sidebar_label: "JobTimeSeriesStatisticsQueryResult"
mdx:
  format: md
---

# Type Alias: JobTimeSeriesStatisticsQueryResult

```ts
type JobTimeSeriesStatisticsQueryResult = SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:3868](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3868)

Job time-series statistics query result.

## Type Declaration

### items

```ts
items: JobTimeSeriesStatisticsItem[];
```

The list of time-bucketed statistics items, ordered ascending by time.

### page

```ts
page: SearchQueryPageResponse;
```
