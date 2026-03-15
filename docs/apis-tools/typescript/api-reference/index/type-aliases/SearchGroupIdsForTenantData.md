---
title: "Type Alias: SearchGroupIdsForTenantData"
sidebar_label: "SearchGroupIdsForTenantData"
mdx:
  format: md
---

# Type Alias: SearchGroupIdsForTenantData

```ts
type SearchGroupIdsForTenantData = object;
```

Defined in: [gen/types.gen.ts:15165](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15165)

## Properties

### body?

```ts
optional body: TenantGroupSearchQueryRequest;
```

Defined in: [gen/types.gen.ts:15166](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15166)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15167](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15167)

#### tenantId

```ts
tenantId: TenantId;
```

The unique identifier of the tenant.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:15173](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15173)

***

### url

```ts
url: "/tenants/{tenantId}/groups/search";
```

Defined in: [gen/types.gen.ts:15174](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15174)
