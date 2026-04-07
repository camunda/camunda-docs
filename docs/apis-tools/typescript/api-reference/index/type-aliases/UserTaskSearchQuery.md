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

Defined in: [gen/types.gen.ts:7527](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7527)

User task search query request.

## Type Declaration

### filter?

```ts
optional filter?: UserTaskFilter;
```

The user task search filters.

### sort?

```ts
optional sort?: UserTaskSearchQuerySortRequest[];
```

Sort field criteria.
