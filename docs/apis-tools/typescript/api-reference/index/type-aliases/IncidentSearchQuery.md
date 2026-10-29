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

## Type Declaration

### filter?

```ts
filter?: IncidentFilter;
```

The incident search filters.

### sort?

```ts
sort?: IncidentSearchQuerySortRequest[];
```

Sort field criteria.
