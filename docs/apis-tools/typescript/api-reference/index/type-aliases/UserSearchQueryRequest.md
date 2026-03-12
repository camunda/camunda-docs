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

Defined in: [gen/types.gen.ts:7986](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7986)

## Type Declaration

### filter?

```ts
optional filter: UserFilter;
```

The user search filters.

### sort?

```ts
optional sort: UserSearchQuerySortRequest[];
```

Sort field criteria.
