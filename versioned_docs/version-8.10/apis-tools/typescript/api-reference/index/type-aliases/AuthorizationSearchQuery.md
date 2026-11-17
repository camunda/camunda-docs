---
title: "Type Alias: AuthorizationSearchQuery"
sidebar_label: "AuthorizationSearchQuery"
mdx:
  format: md
---

# Type Alias: AuthorizationSearchQuery

```ts
type AuthorizationSearchQuery = SearchQueryRequest & object;
```

## Type Declaration

### filter?

```ts
optional filter?: AuthorizationFilter;
```

The authorization search filters.

### sort?

```ts
optional sort?: AuthorizationSearchQuerySortRequest[];
```

Sort field criteria.
