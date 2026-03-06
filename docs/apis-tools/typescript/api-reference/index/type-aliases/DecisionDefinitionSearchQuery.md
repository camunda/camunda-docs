---
title: "Type Alias: DecisionDefinitionSearchQuery"
sidebar_label: "DecisionDefinitionSearchQuery"
mdx:
  format: md
---

# Type Alias: DecisionDefinitionSearchQuery

```ts
type DecisionDefinitionSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:1441](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1441)

## Type Declaration

### filter?

```ts
optional filter: DecisionDefinitionFilter;
```

The decision definition search filters.

### sort?

```ts
optional sort: DecisionDefinitionSearchQuerySortRequest[];
```

Sort field criteria.
