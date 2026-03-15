---
title: "Type Alias: AdvancedIntegerFilter"
sidebar_label: "AdvancedIntegerFilter"
mdx:
  format: md
---

# Type Alias: AdvancedIntegerFilter

```ts
type AdvancedIntegerFilter = object;
```

Defined in: [gen/types.gen.ts:2829](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2829)

Advanced filter

Advanced integer (int32) filter.

## Properties

### $eq?

```ts
optional $eq: number;
```

Defined in: [gen/types.gen.ts:2833](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2833)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:2841](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2841)

Checks if the current property exists.

***

### $gt?

```ts
optional $gt: number;
```

Defined in: [gen/types.gen.ts:2845](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2845)

Greater than comparison with the provided value.

***

### $gte?

```ts
optional $gte: number;
```

Defined in: [gen/types.gen.ts:2849](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2849)

Greater than or equal comparison with the provided value.

***

### $in?

```ts
optional $in: number[];
```

Defined in: [gen/types.gen.ts:2861](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2861)

Checks if the property matches any of the provided values.

***

### $lt?

```ts
optional $lt: number;
```

Defined in: [gen/types.gen.ts:2853](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2853)

Lower than comparison with the provided value.

***

### $lte?

```ts
optional $lte: number;
```

Defined in: [gen/types.gen.ts:2857](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2857)

Lower than or equal comparison with the provided value.

***

### $neq?

```ts
optional $neq: number;
```

Defined in: [gen/types.gen.ts:2837](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2837)

Checks for inequality with the provided value.
