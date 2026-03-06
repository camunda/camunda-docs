---
title: "Type Alias: CreateDeploymentData"
sidebar_label: "CreateDeploymentData"
mdx:
  format: md
---

# Type Alias: CreateDeploymentData

```ts
type CreateDeploymentData = object;
```

Defined in: [gen/types.gen.ts:9926](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9926)

## Properties

### body

```ts
body: object;
```

Defined in: [gen/types.gen.ts:9927](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9927)

#### resources

```ts
resources: (Blob | File)[];
```

The binary data to create the deployment resources. It is possible to have more than one form part with different form part names for the binary data to create a deployment.

#### tenantId?

```ts
optional tenantId: TenantId;
```

***

### path?

```ts
optional path: never;
```

Defined in: [gen/types.gen.ts:9935](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9935)

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:9936](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9936)

***

### url

```ts
url: "/deployments";
```

Defined in: [gen/types.gen.ts:9937](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L9937)
