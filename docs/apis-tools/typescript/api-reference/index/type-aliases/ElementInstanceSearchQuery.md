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

Defined in: [gen/types.gen.ts:2530](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2530)

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
