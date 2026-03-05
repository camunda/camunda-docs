---
title: "Type Alias: DecisionRequirementsSearchQuery"
sidebar_label: "DecisionRequirementsSearchQuery"
mdx:
  format: md
---

# Type Alias: DecisionRequirementsSearchQuery

```ts
type DecisionRequirementsSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:1984](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1984)

## Type Declaration

### filter?

```ts
optional filter: DecisionRequirementsFilter;
```

The decision definition search filters.

### sort?

```ts
optional sort: DecisionRequirementsSearchQuerySortRequest[];
```

Sort field criteria.
