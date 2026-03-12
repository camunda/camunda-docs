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

Defined in: [gen/types.gen.ts:9337](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9337)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:9338](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9338)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:9339](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9339)

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

Defined in: [gen/types.gen.ts:9349](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9349)

***

### url

```ts
url: "/cluster-variables/tenants/{tenantId}/{name}";
```

Defined in: [gen/types.gen.ts:9350](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L9350)
