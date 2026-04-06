---
title: "Type Alias: JobErrorStatisticsQueryResult"
sidebar_label: "JobErrorStatisticsQueryResult"
mdx:
  format: md
---

# Type Alias: JobErrorStatisticsQueryResult

```ts
type JobErrorStatisticsQueryResult = SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:3934](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3934)

Job error statistics query result.

## Type Declaration

### items

```ts
items: JobErrorStatisticsItem[];
```

The list of per-error statistics items.

### page

```ts
page: SearchQueryPageResponse;
```
