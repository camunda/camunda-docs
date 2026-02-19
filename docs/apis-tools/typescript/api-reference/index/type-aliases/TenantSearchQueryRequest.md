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

Defined in: [gen/types.gen.ts:6628](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6628)

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
