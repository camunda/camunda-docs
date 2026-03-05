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

Defined in: [gen/types.gen.ts:3807](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3807)

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
