---
title: "Type Alias: AdvancedDateTimeFilter"
sidebar_label: "AdvancedDateTimeFilter"
mdx:
  format: md
---

# Type Alias: AdvancedDateTimeFilter

```ts
type AdvancedDateTimeFilter = object;
```

Defined in: [gen/types.gen.ts:2874](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2874)

Advanced filter

Advanced date-time filter.

## Properties

### $eq?

```ts
optional $eq: string;
```

Defined in: [gen/types.gen.ts:2878](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2878)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:2886](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2886)

Checks if the current property exists.

***

### $gt?

```ts
optional $gt: string;
```

Defined in: [gen/types.gen.ts:2890](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2890)

Greater than comparison with the provided value.

***

### $gte?

```ts
optional $gte: string;
```

Defined in: [gen/types.gen.ts:2894](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2894)

Greater than or equal comparison with the provided value.

***

### $in?

```ts
optional $in: string[];
```

Defined in: [gen/types.gen.ts:2906](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2906)

Checks if the property matches any of the provided values.

***

### $lt?

```ts
optional $lt: string;
```

Defined in: [gen/types.gen.ts:2898](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2898)

Lower than comparison with the provided value.

***

### $lte?

```ts
optional $lte: string;
```

Defined in: [gen/types.gen.ts:2902](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2902)

Lower than or equal comparison with the provided value.

***

### $neq?

```ts
optional $neq: string;
```

Defined in: [gen/types.gen.ts:2882](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L2882)

Checks for inequality with the provided value.
