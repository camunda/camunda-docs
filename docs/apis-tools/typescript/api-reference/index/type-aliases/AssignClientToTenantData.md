---
title: "Type Alias: AssignClientToTenantData"
sidebar_label: "AssignClientToTenantData"
mdx:
  format: md
---

# Type Alias: AssignClientToTenantData

```ts
type AssignClientToTenantData = object;
```

Defined in: [gen/types.gen.ts:15114](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15114)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:15115](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15115)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15116](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15116)

#### clientId

```ts
clientId: string;
```

The unique identifier of the application.

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

Defined in: [gen/types.gen.ts:15126](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15126)

***

### url

```ts
url: "/tenants/{tenantId}/clients/{clientId}";
```

Defined in: [gen/types.gen.ts:15127](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15127)
