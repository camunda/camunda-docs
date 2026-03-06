---
title: "Type Alias: GetTenantClusterVariableData"
sidebar_label: "GetTenantClusterVariableData"
mdx:
  format: md
---

# Type Alias: GetTenantClusterVariableData

```ts
type GetTenantClusterVariableData = object;
```

Defined in: [gen/types.gen.ts:9273](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9273)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:9274](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9274)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9275](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9275)

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

Defined in: [gen/types.gen.ts:9285](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9285)

***

### url

```ts
url: "/cluster-variables/tenants/{tenantId}/{name}";
```

Defined in: [gen/types.gen.ts:9286](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9286)
