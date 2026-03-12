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

Defined in: [gen/types.gen.ts:6977](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L6977)

Role search request.

## Type Declaration

### filter?

```ts
optional filter: RoleFilter;
```

The role search filters.

### sort?

```ts
optional sort: RoleSearchQuerySortRequest[];
```

Sort field criteria.
