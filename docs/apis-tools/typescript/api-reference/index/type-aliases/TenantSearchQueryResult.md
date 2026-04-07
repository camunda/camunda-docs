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

Defined in: [gen/types.gen.ts:7411](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L7411)

Tenant search response.

## Type Declaration

### items

```ts
items: TenantResult[];
```

The matching tenants.
