---
title: "Type Alias: DeleteTenantClusterVariableData"
sidebar_label: "DeleteTenantClusterVariableData"
mdx:
  format: md
---

# Type Alias: DeleteTenantClusterVariableData

```ts
type DeleteTenantClusterVariableData = object;
```

Defined in: [gen/types.gen.ts:9223](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9223)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:9224](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9224)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9225](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9225)

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

Defined in: [gen/types.gen.ts:9235](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9235)

***

### url

```ts
url: "/cluster-variables/tenants/{tenantId}/{name}";
```

Defined in: [gen/types.gen.ts:9236](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9236)
