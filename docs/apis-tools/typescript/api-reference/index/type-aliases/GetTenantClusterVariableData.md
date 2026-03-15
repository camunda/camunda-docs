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

Defined in: [gen/types.gen.ts:9387](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9387)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:9388](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9388)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9389](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9389)

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

Defined in: [gen/types.gen.ts:9399](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9399)

***

### url

```ts
url: "/cluster-variables/tenants/{tenantId}/{name}";
```

Defined in: [gen/types.gen.ts:9400](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9400)
