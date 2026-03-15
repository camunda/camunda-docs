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

Defined in: [gen/types.gen.ts:11375](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11375)

## Properties

### body?

```ts
optional body: SearchQueryRequest & object;
```

Defined in: [gen/types.gen.ts:11376](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11376)

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

Defined in: [gen/types.gen.ts:11388](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11388)

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

Defined in: [gen/types.gen.ts:11394](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11394)

***

### url

```ts
url: "/groups/{groupId}/users/search";
```

Defined in: [gen/types.gen.ts:11395](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L11395)
