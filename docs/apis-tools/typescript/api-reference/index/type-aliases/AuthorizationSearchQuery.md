---
title: "Type Alias: AuthorizationSearchQuery"
sidebar_label: "AuthorizationSearchQuery"
mdx:
  format: md
---

# Type Alias: AuthorizationSearchQuery

```ts
type AuthorizationSearchQuery = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:601](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L601)

## Type Declaration

### filter?

```ts
optional filter?: AuthorizationFilter;
```

The authorization search filters.

### sort?

```ts
optional sort?: AuthorizationSearchQuerySortRequest[];
```

Sort field criteria.
