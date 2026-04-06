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

Defined in: [gen/types.gen.ts:7625](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7625)

User task search query response.

## Type Declaration

### items

```ts
items: UserTaskResult[];
```

The matching user tasks.
