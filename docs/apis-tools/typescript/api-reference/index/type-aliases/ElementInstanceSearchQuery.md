---
title: "Type Alias: ElementInstanceSearchQuery"
sidebar_label: "ElementInstanceSearchQuery"
mdx:
  format: md
---

# Type Alias: ElementInstanceSearchQuery

```ts
type ElementInstanceSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:2528](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L2528)

Element instance search request.

## Type Declaration

### filter?

```ts
optional filter?: ElementInstanceFilter;
```

The element instance search filters.

### sort?

```ts
optional sort?: ElementInstanceSearchQuerySortRequest[];
```

Sort field criteria.
