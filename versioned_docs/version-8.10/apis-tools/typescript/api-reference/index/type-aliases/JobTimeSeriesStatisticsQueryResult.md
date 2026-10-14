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
