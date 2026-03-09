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

Defined in: [gen/types.gen.ts:7208](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7208)

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
