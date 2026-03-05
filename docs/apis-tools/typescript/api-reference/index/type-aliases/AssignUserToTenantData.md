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

Defined in: [gen/types.gen.ts:15454](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15454)

## Properties

### body?

```ts
optional body: never;
```

Defined in: [gen/types.gen.ts:15455](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15455)

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:15456](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15456)

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

Defined in: [gen/types.gen.ts:15466](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15466)

***

### url

```ts
url: "/tenants/{tenantId}/users/{username}";
```

Defined in: [gen/types.gen.ts:15467](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L15467)
