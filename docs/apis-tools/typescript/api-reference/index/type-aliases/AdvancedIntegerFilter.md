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

Defined in: [gen/types.gen.ts:2827](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2827)

Advanced filter

Advanced integer (int32) filter.

## Properties

### $eq?

```ts
optional $eq: number;
```

Defined in: [gen/types.gen.ts:2831](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2831)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:2839](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2839)

Checks if the current property exists.

***

### $gt?

```ts
optional $gt: number;
```

Defined in: [gen/types.gen.ts:2843](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2843)

Greater than comparison with the provided value.

***

### $gte?

```ts
optional $gte: number;
```

Defined in: [gen/types.gen.ts:2847](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2847)

Greater than or equal comparison with the provided value.

***

### $in?

```ts
optional $in: number[];
```

Defined in: [gen/types.gen.ts:2859](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2859)

Checks if the property matches any of the provided values.

***

### $lt?

```ts
optional $lt: number;
```

Defined in: [gen/types.gen.ts:2851](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2851)

Lower than comparison with the provided value.

***

### $lte?

```ts
optional $lte: number;
```

Defined in: [gen/types.gen.ts:2855](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2855)

Lower than or equal comparison with the provided value.

***

### $neq?

```ts
optional $neq: number;
```

Defined in: [gen/types.gen.ts:2835](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2835)

Checks for inequality with the provided value.
