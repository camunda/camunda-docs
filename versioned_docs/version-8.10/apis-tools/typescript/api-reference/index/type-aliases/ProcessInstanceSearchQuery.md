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

Process instance search request.

## Type Declaration

### filter?

```ts
optional filter?: ProcessInstanceFilter;
```

The process instance search filters.

### sort?

```ts
optional sort?: ProcessInstanceSearchQuerySortRequest[];
```

Sort field criteria.
