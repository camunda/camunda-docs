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

Defined in: [gen/types.gen.ts:6755](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6755)

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
