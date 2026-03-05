---
title: "Type Alias: DeploymentResourceResult"
sidebar_label: "DeploymentResourceResult"
mdx:
  format: md
---

# Type Alias: DeploymentResourceResult

```ts
type DeploymentResourceResult = object;
```

Defined in: [gen/types.gen.ts:2220](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2220)

A deployed Resource.

## Properties

### resourceId?

```ts
optional resourceId: string;
```

Defined in: [gen/types.gen.ts:2224](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2224)

The resource id of the deployed resource.

***

### resourceKey?

```ts
optional resourceKey: ResourceKey;
```

Defined in: [gen/types.gen.ts:2237](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2237)

The assigned key, which acts as a unique identifier for this Resource.

***

### resourceName?

```ts
optional resourceName: string;
```

Defined in: [gen/types.gen.ts:2228](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2228)

The name of the deployed resource.

***

### tenantId?

```ts
optional tenantId: TenantId;
```

Defined in: [gen/types.gen.ts:2233](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2233)

***

### version?

```ts
optional version: number;
```

Defined in: [gen/types.gen.ts:2232](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2232)

The description of the deployed resource.
