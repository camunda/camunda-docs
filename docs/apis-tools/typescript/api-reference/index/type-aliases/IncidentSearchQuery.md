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

Defined in: [gen/types.gen.ts:3358](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L3358)

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
