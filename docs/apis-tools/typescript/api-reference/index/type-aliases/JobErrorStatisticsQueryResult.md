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

Defined in: [gen/types.gen.ts:3931](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3931)

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
