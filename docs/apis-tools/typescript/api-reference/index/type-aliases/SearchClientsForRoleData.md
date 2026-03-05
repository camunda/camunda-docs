---
title: "Type Alias: SearchClientsForRoleData"
sidebar_label: "SearchClientsForRoleData"
mdx:
  format: md
---

# Type Alias: SearchClientsForRoleData

```ts
type SearchClientsForRoleData = object;
```

Defined in: [gen/types.gen.ts:13809](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13809)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:13810](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13810)

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

Defined in: [gen/types.gen.ts:13822](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13822)

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

Defined in: [gen/types.gen.ts:13828](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13828)

***

### url

```ts
url: "/roles/{roleId}/clients/search";
```

Defined in: [gen/types.gen.ts:13829](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L13829)
