---
title: "Type Alias: ProcessInstanceSearchQuery"
sidebar_label: "ProcessInstanceSearchQuery"
mdx:
  format: md
---

# Type Alias: ProcessInstanceSearchQuery

```ts
type ProcessInstanceSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:6286](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6286)

Process instance search request.

## Type Declaration

### filter?

```ts
optional filter?: ProcessInstanceFilter;
```

The process instance search filters.

### sort?

```ts
optional sort?: ProcessInstanceSearchQuerySortRequest[];
```

Sort field criteria.
