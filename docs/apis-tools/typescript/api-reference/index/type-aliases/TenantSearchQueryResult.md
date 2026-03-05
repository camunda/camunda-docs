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

Defined in: [gen/types.gen.ts:7287](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7287)

Tenant search response.

## Type Declaration

### items

```ts
items: TenantResult[];
```

The matching tenants.
