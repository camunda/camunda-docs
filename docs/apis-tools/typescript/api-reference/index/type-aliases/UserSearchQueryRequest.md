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
filter?: UserFilter;
```

The user search filters.

### sort?

```ts
sort?: UserSearchQuerySortRequest[];
```

Sort field criteria.
