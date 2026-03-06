---
title: "Type Alias: ProcessDefinitionSearchQuery"
sidebar_label: "ProcessDefinitionSearchQuery"
mdx:
  format: md
---

# Type Alias: ProcessDefinitionSearchQuery

```ts
type ProcessDefinitionSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:5667](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5667)

## Type Declaration

### filter?

```ts
optional filter: ProcessDefinitionFilter;
```

The process definition search filters.

### sort?

```ts
optional sort: ProcessDefinitionSearchQuerySortRequest[];
```

Sort field criteria.
