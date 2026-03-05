---
title: "Type Alias: ProcessInstanceSearchQuery"
sidebar_label: "ProcessInstanceSearchQuery"
mdx:
  format: md
---

# Type Alias: ProcessInstanceSearchQuery

```ts
type ProcessInstanceSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:6212](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6212)

Process instance search request.

## Type Declaration

### filter?

```ts
optional filter: ProcessInstanceFilter;
```

The process instance search filters.

### sort?

```ts
optional sort: ProcessInstanceSearchQuerySortRequest[];
```

Sort field criteria.
