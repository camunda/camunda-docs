---
title: "Type Alias: UserTaskSearchQuery"
sidebar_label: "UserTaskSearchQuery"
mdx:
  format: md
---

# Type Alias: UserTaskSearchQuery

```ts
type UserTaskSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:7517](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7517)

User task search query request.

## Type Declaration

### filter?

```ts
optional filter: UserTaskFilter;
```

The user task search filters.

### sort?

```ts
optional sort: UserTaskSearchQuerySortRequest[];
```

Sort field criteria.
