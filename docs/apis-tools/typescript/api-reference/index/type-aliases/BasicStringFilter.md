---
title: "Type Alias: BasicStringFilter"
sidebar_label: "BasicStringFilter"
mdx:
  format: md
---

# Type Alias: BasicStringFilter

```ts
type BasicStringFilter = object;
```

Defined in: [gen/types.gen.ts:2782](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2782)

Advanced filter

Basic advanced string filter.

## Properties

### $eq?

```ts
optional $eq: string;
```

Defined in: [gen/types.gen.ts:2786](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2786)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:2794](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2794)

Checks if the current property exists.

***

### $in?

```ts
optional $in: string[];
```

Defined in: [gen/types.gen.ts:2798](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2798)

Checks if the property matches any of the provided values.

***

### $neq?

```ts
optional $neq: string;
```

Defined in: [gen/types.gen.ts:2790](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2790)

Checks for inequality with the provided value.

***

### $notIn?

```ts
optional $notIn: string[];
```

Defined in: [gen/types.gen.ts:2802](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2802)

Checks if the property matches none of the provided values.
