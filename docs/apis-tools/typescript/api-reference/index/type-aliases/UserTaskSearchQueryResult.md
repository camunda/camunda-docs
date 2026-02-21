---
title: "Type Alias: UserTaskSearchQueryResult"
sidebar_label: "UserTaskSearchQueryResult"
mdx:
  format: md
---

# Type Alias: UserTaskSearchQueryResult

```ts
type UserTaskSearchQueryResult = SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:6847](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6847)

User task search query response.

## Type Declaration

### items?

```ts
optional items: UserTaskResult[];
```

The matching user tasks.
