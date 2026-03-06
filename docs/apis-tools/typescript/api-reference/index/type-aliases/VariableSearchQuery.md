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

Defined in: [gen/types.gen.ts:7919](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7919)

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
