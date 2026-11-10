---
title: "Type Alias: RoleUserSearchQueryRequest"
sidebar_label: "RoleUserSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: RoleUserSearchQueryRequest

```ts
type RoleUserSearchQueryRequest = SearchQueryRequest & object;
```

## Type Declaration

### filter?

```ts
optional filter?: RoleUserFilterRequest;
```

The user filter criteria.

### sort?

```ts
optional sort?: RoleUserSearchQuerySortRequest[];
```

Sort field criteria.
