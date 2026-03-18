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

Defined in: [gen/types.gen.ts:1669](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L1669)

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
