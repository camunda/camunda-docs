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

Defined in: [gen/types.gen.ts:7872](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7872)

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
