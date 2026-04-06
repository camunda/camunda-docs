---
title: "Type Alias: JobWorkerStatisticsQueryResult"
sidebar_label: "JobWorkerStatisticsQueryResult"
mdx:
  format: md
---

# Type Alias: JobWorkerStatisticsQueryResult

```ts
type JobWorkerStatisticsQueryResult = SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:3810](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3810)

Job worker statistics query result.

## Type Declaration

### items

```ts
items: JobWorkerStatisticsItem[];
```

The list of per-worker statistics items.

### page

```ts
page: SearchQueryPageResponse;
```
