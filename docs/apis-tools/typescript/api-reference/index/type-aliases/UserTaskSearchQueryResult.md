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

Defined in: [gen/types.gen.ts:7615](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7615)

User task search query response.

## Type Declaration

### items

```ts
items: UserTaskResult[];
```

The matching user tasks.
