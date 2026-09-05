---
title: "Type Alias: RoleSearchQueryRequest"
sidebar_label: "RoleSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: RoleSearchQueryRequest

```ts
type RoleSearchQueryRequest = SearchQueryRequest & object;
```

Role search request.

## Type Declaration

### filter?

```ts
optional filter?: RoleFilter;
```

The role search filters.

### sort?

```ts
optional sort?: RoleSearchQuerySortRequest[];
```

Sort field criteria.
