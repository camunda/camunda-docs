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

Defined in: [gen/types.gen.ts:605](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L605)

## Type Declaration

### filter?

```ts
optional filter: AuthorizationFilter;
```

The authorization search filters.

### sort?

```ts
optional sort: AuthorizationSearchQuerySortRequest[];
```

Sort field criteria.
