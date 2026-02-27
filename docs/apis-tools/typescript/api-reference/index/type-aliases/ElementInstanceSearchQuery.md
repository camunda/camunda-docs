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

Defined in: [gen/types.gen.ts:2389](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2389)

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
