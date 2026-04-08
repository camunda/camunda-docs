---
title: "Type Alias: SearchClientsForTenantData"
sidebar_label: "SearchClientsForTenantData"
mdx:
  format: md
---

# Type Alias: SearchClientsForTenantData

```ts
type SearchClientsForTenantData = object;
```

Defined in: [gen/types.gen.ts:15075](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15075)

## Properties

### body?

```ts
optional body?: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:15076](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15076)

#### Type Declaration

##### sort?

```ts
optional sort?: object[];
```

Sort field criteria.

---

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15088](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15088)

#### tenantId

```ts
tenantId: TenantId;
```

The unique identifier of the tenant.

---

### query?

```ts
optional query?: never;
```

Defined in: [gen/types.gen.ts:15094](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15094)

---

### url

```ts
url: "/tenants/{tenantId}/clients/search";
```

Defined in: [gen/types.gen.ts:15095](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L15095)
