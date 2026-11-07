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

Tenant search request

## Type Declaration

### filter?

```ts
filter?: TenantFilter;
```

The tenant search filters.

### sort?

```ts
sort?: TenantSearchQuerySortRequest[];
```

Sort field criteria.
