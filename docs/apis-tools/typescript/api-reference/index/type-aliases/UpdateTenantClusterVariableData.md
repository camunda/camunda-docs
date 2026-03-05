---
title: "Type Alias: UpdateTenantClusterVariableData"
sidebar_label: "UpdateTenantClusterVariableData"
mdx:
  format: md
---

# Type Alias: UpdateTenantClusterVariableData

```ts
type UpdateTenantClusterVariableData = object;
```

Defined in: [gen/types.gen.ts:9323](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9323)

## Properties

### body

```ts
body: UpdateClusterVariableRequest;
```

Defined in: [gen/types.gen.ts:9324](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9324)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9325](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9325)

#### name

```ts
name: string;
```

The name of the cluster variable

#### tenantId

```ts
tenantId: TenantId;
```

The tenant ID

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:9335](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9335)

***

### url

```ts
url: "/cluster-variables/tenants/{tenantId}/{name}";
```

Defined in: [gen/types.gen.ts:9336](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9336)
