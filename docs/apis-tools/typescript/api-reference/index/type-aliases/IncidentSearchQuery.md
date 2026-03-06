---
title: "Type Alias: IncidentSearchQuery"
sidebar_label: "IncidentSearchQuery"
mdx:
  format: md
---

# Type Alias: IncidentSearchQuery

```ts
type IncidentSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:3358](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L3358)

## Type Declaration

### filter?

```ts
optional filter: IncidentFilter;
```

The incident search filters.

### sort?

```ts
optional sort: IncidentSearchQuerySortRequest[];
```

Sort field criteria.
