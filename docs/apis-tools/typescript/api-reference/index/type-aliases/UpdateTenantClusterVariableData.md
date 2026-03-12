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

Defined in: [gen/types.gen.ts:9437](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9437)

## Properties

### body

```ts
body: UpdateClusterVariableRequest;
```

Defined in: [gen/types.gen.ts:9438](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9438)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9439](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9439)

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

Defined in: [gen/types.gen.ts:9449](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9449)

***

### url

```ts
url: "/cluster-variables/tenants/{tenantId}/{name}";
```

Defined in: [gen/types.gen.ts:9450](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9450)
