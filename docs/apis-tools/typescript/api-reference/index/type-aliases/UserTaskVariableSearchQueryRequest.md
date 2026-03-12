---
title: "Type Alias: UserTaskVariableSearchQueryRequest"
sidebar_label: "UserTaskVariableSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: UserTaskVariableSearchQueryRequest

```ts
type UserTaskVariableSearchQueryRequest = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:7813](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7813)

User task search query request.

## Type Declaration

### filter?

```ts
optional filter: UserTaskVariableFilter;
```

The user task variable search filters.

### sort?

```ts
optional sort: UserTaskVariableSearchQuerySortRequest[];
```

Sort field criteria.
