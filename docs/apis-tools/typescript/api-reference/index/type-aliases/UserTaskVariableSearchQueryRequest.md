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

Defined in: [gen/types.gen.ts:7037](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L7037)

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
