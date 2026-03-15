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

Defined in: [gen/types.gen.ts:7401](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L7401)

Tenant search response.

## Type Declaration

### items

```ts
items: TenantResult[];
```

The matching tenants.
