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

Defined in: [gen/types.gen.ts:2999](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L2999)

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
