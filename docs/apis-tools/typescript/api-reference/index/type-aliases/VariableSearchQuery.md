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

Defined in: [gen/types.gen.ts:7255](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7255)

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
