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

Defined in: [gen/types.gen.ts:7376](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7376)

Tenant search request

## Type Declaration

### filter?

```ts
optional filter: TenantFilter;
```

The tenant search filters.

### sort?

```ts
optional sort: TenantSearchQuerySortRequest[];
```

Sort field criteria.
