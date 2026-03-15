---
title: "Type Alias: SearchClientsForGroupData"
sidebar_label: "SearchClientsForGroupData"
mdx:
  format: md
---

# Type Alias: SearchClientsForGroupData

```ts
type SearchClientsForGroupData = object;
```

Defined in: [gen/types.gen.ts:10994](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10994)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:10995](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L10995)

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

Defined in: [gen/types.gen.ts:11007](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11007)

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

Defined in: [gen/types.gen.ts:11013](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11013)

***

### url

```ts
url: "/groups/{groupId}/clients/search";
```

Defined in: [gen/types.gen.ts:11014](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11014)
