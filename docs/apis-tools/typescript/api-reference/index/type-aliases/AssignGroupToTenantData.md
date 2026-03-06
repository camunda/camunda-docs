---
title: "Type Alias: AssignGroupToTenantData"
sidebar_label: "AssignGroupToTenantData"
mdx:
  format: md
---

# Type Alias: AssignGroupToTenantData

```ts
type AssignGroupToTenantData = object;
```

Defined in: [gen/types.gen.ts:15057](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15057)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:15058](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15058)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15059](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15059)

#### groupId

```ts
groupId: string;
```

The unique identifier of the group.

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

Defined in: [gen/types.gen.ts:15069](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15069)

***

### url

```ts
url: "/tenants/{tenantId}/groups/{groupId}";
```

Defined in: [gen/types.gen.ts:15070](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15070)
