---
title: "Type Alias: RoleSearchQueryRequest"
sidebar_label: "RoleSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: RoleSearchQueryRequest

```ts
type RoleSearchQueryRequest = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:6988](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L6988)

Role search request.

## Type Declaration

### filter?

```ts
optional filter?: RoleFilter;
```

The role search filters.

### sort?

```ts
optional sort?: RoleSearchQuerySortRequest[];
```

Sort field criteria.
