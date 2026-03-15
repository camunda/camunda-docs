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

Defined in: [gen/types.gen.ts:13960](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13960)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:13961](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13961)

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

Defined in: [gen/types.gen.ts:13973](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13973)

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

Defined in: [gen/types.gen.ts:13979](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13979)

***

### url

```ts
url: "/roles/{roleId}/clients/search";
```

Defined in: [gen/types.gen.ts:13980](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L13980)
