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

Defined in: [gen/types.gen.ts:7823](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7823)

User task search query request.

## Type Declaration

### filter?

```ts
optional filter?: UserTaskVariableFilter;
```

The user task variable search filters.

### sort?

```ts
optional sort?: UserTaskVariableSearchQuerySortRequest[];
```

Sort field criteria.
