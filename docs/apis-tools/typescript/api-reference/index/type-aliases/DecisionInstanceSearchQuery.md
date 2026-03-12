---
title: "Type Alias: DecisionInstanceSearchQuery"
sidebar_label: "DecisionInstanceSearchQuery"
mdx:
  format: md
---

# Type Alias: DecisionInstanceSearchQuery

```ts
type DecisionInstanceSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:1704](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L1704)

## Type Declaration

### filter?

```ts
optional filter: DecisionInstanceFilter;
```

The decision instance search filters.

### sort?

```ts
optional sort: DecisionInstanceSearchQuerySortRequest[];
```

Sort field criteria.
