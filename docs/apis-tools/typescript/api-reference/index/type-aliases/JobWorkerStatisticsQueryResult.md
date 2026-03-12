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

Defined in: [gen/types.gen.ts:3807](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3807)

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
