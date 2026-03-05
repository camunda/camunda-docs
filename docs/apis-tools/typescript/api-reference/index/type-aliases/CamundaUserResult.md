---
title: "Type Alias: CamundaUserResult"
sidebar_label: "CamundaUserResult"
mdx:
  format: md
---

# Type Alias: CamundaUserResult

```ts
type CamundaUserResult = object;
```

Defined in: [gen/types.gen.ts:505](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L505)

## Properties

### authorizedComponents

```ts
authorizedComponents: string[];
```

Defined in: [gen/types.gen.ts:521](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L521)

The web components the user is authorized to use.

***

### c8Links

```ts
c8Links: object;
```

Defined in: [gen/types.gen.ts:541](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L541)

The links to the components in the C8 stack.

#### Index Signature

```ts
[key: string]: string
```

***

### canLogout

```ts
canLogout: boolean;
```

Defined in: [gen/types.gen.ts:547](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L547)

Flag for understanding if the user is able to perform logout.

***

### displayName?

```ts
optional displayName: string | null;
```

Defined in: [gen/types.gen.ts:513](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L513)

The display name of the user.

***

### email?

```ts
optional email: string | null;
```

Defined in: [gen/types.gen.ts:517](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L517)

The email of the user.

***

### groups

```ts
groups: string[];
```

Defined in: [gen/types.gen.ts:529](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L529)

The groups assigned to the user.

***

### roles

```ts
roles: string[];
```

Defined in: [gen/types.gen.ts:533](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L533)

The roles assigned to the user.

***

### salesPlanType

```ts
salesPlanType: string | null;
```

Defined in: [gen/types.gen.ts:537](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L537)

The plan of the user.

***

### tenants

```ts
tenants: TenantResult[];
```

Defined in: [gen/types.gen.ts:525](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L525)

The tenants the user is a member of.

***

### username?

```ts
optional username: Username | null;
```

Defined in: [gen/types.gen.ts:509](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L509)

The username of the user.
