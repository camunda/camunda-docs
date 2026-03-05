---
title: "Type Alias: AdvancedMessageSubscriptionStateFilter"
sidebar_label: "AdvancedMessageSubscriptionStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedMessageSubscriptionStateFilter

```ts
type AdvancedMessageSubscriptionStateFilter = object;
```

Defined in: [gen/types.gen.ts:5569](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5569)

Advanced filter

Advanced MessageSubscriptionStateEnum filter

## Properties

### $eq?

```ts
optional $eq: MessageSubscriptionStateEnum;
```

Defined in: [gen/types.gen.ts:5573](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5573)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:5581](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5581)

Checks if the current property exists.

***

### $in?

```ts
optional $in: MessageSubscriptionStateEnum[];
```

Defined in: [gen/types.gen.ts:5585](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5585)

Checks if the property matches any of the provided values.

***

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:5586](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5586)

***

### $neq?

```ts
optional $neq: MessageSubscriptionStateEnum;
```

Defined in: [gen/types.gen.ts:5577](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L5577)

Checks for inequality with the provided value.
