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

Defined in: [gen/types.gen.ts:3871](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3871)

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
