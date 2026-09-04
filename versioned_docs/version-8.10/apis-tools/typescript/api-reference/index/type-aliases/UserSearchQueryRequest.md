---
title: "Type Alias: UserSearchQueryRequest"
sidebar_label: "UserSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: UserSearchQueryRequest

```ts
type UserSearchQueryRequest = SearchQueryRequest & object;
```

## Type Declaration

### filter?

```ts
optional filter?: UserFilter;
```

The user search filters.

### sort?

```ts
optional sort?: UserSearchQuerySortRequest[];
```

Sort field criteria.
