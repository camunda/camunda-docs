---
title: "Type Alias: VariableSearchQuery"
sidebar_label: "VariableSearchQuery"
mdx:
  format: md
---

# Type Alias: VariableSearchQuery

```ts
type VariableSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:8033](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8033)

Variable search query request.

## Type Declaration

### filter?

```ts
optional filter: VariableFilter;
```

The variable search filters.

### sort?

```ts
optional sort: VariableSearchQuerySortRequest[];
```

Sort field criteria.
