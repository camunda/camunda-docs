---
title: "Type Alias: GroupSearchQueryRequest"
sidebar_label: "GroupSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: GroupSearchQueryRequest

```ts
type GroupSearchQueryRequest = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:3202](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L3202)

Group search request.

## Type Declaration

### filter?

```ts
optional filter?: GroupFilter;
```

The group search filters.

### sort?

```ts
optional sort?: GroupSearchQuerySortRequest[];
```

Sort field criteria.
