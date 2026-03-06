---
title: "Type Alias: SearchUsersForRoleData"
sidebar_label: "SearchUsersForRoleData"
mdx:
  format: md
---

# Type Alias: SearchUsersForRoleData

```ts
type SearchUsersForRoleData = object;
```

Defined in: [gen/types.gen.ts:14291](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14291)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:14292](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14292)

#### Type Declaration

##### sort?

```ts
optional sort: object[];
```

Sort field criteria.

***

### path

```ts
path: object;
```

Defined in: [gen/types.gen.ts:14304](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14304)

#### roleId

```ts
roleId: string;
```

The role ID.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:14310](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14310)

***

### url

```ts
url: "/roles/{roleId}/users/search";
```

Defined in: [gen/types.gen.ts:14311](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L14311)
