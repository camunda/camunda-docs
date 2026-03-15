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

Defined in: [gen/types.gen.ts:2532](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2532)

Element instance search request.

## Type Declaration

### filter?

```ts
optional filter: ElementInstanceFilter;
```

The element instance search filters.

### sort?

```ts
optional sort: ElementInstanceSearchQuerySortRequest[];
```

Sort field criteria.
