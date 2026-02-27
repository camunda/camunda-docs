---
title: "Type Alias: TenantSearchQueryResult"
sidebar_label: "TenantSearchQueryResult"
mdx:
  format: md
---

# Type Alias: TenantSearchQueryResult

```ts
type TenantSearchQueryResult = SearchQueryResponse & object;
```

Defined in: [gen/types.gen.ts:6653](https://github.com/camunda/orchestration-cluster-api-js/blob/67d45ce4f287cc3401854a637606d7e989daefac/src/gen/types.gen.ts#L6653)

Tenant search response.

## Type Declaration

### items?

```ts
optional items: TenantResult[];
```

The matching tenants.
