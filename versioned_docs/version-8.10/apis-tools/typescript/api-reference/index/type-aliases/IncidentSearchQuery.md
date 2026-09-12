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
optional filter?: IncidentFilter;
```

The incident search filters.

### sort?

```ts
optional sort?: IncidentSearchQuerySortRequest[];
```

Sort field criteria.
