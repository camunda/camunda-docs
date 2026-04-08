---
title: "Type Alias: TenantSearchQueryRequest"
sidebar_label: "TenantSearchQueryRequest"
mdx:
  format: md
---

# Type Alias: TenantSearchQueryRequest

```ts
type TenantSearchQueryRequest = SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:7386](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7386)

Tenant search request

## Type Declaration

### filter?

```ts
optional filter?: TenantFilter;
```

The tenant search filters.

### sort?

```ts
optional sort?: TenantSearchQuerySortRequest[];
```

Sort field criteria.
