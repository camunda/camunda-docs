---
title: "Type Alias: AssignUserToTenantData"
sidebar_label: "AssignUserToTenantData"
mdx:
  format: md
---

# Type Alias: AssignUserToTenantData

```ts
type AssignUserToTenantData = object;
```

Defined in: [gen/types.gen.ts:15634](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15634)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:15635](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15635)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15636](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15636)

#### tenantId

```ts
tenantId: TenantId;
```

The unique identifier of the tenant.

#### username

```ts
username: Username;
```

The unique identifier of the user.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:15646](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15646)

***

### url

```ts
url: "/tenants/{tenantId}/users/{username}";
```

Defined in: [gen/types.gen.ts:15647](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L15647)
