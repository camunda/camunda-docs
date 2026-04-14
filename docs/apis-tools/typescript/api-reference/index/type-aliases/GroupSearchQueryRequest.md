---
title: "Type Alias: GroupSearchQueryRequest"
sidebar_label: "GroupSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: GroupSearchQueryRequest

```ts
type GroupSearchQueryRequest = SearchQueryRequest & object;
```

Group search request.

## Type Declaration

### filter?

```ts
optional filter?: GroupFilter;
```

The group search filters.

### sort?

```ts
optional sort?: GroupSearchQuerySortRequest[];
```

Sort field criteria.
