---
title: "Type Alias: SearchUsersForGroupData"
sidebar_label: "SearchUsersForGroupData"
mdx:
  format: md
---

# Type Alias: SearchUsersForGroupData

```ts
type SearchUsersForGroupData = object;
```

Defined in: [gen/types.gen.ts:11261](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11261)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:11262](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11262)

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

Defined in: [gen/types.gen.ts:11274](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11274)

#### groupId

```ts
groupId: string;
```

The group ID.

***

### query?

```ts
optional query: never;
```

Defined in: [gen/types.gen.ts:11280](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11280)

***

### url

```ts
url: "/groups/{groupId}/users/search";
```

Defined in: [gen/types.gen.ts:11281](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L11281)
