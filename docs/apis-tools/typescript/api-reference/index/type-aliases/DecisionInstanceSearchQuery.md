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

Defined in: [gen/types.gen.ts:1702](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1702)

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
