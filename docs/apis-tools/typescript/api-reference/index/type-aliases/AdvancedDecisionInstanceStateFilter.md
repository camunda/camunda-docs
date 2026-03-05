---
title: "Type Alias: AdvancedDecisionInstanceStateFilter"
sidebar_label: "AdvancedDecisionInstanceStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedDecisionInstanceStateFilter

```ts
type AdvancedDecisionInstanceStateFilter = object;
```

Defined in: [gen/types.gen.ts:1947](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1947)

Advanced filter

Advanced DecisionInstanceStateEnum filter.

## Properties

### $eq?

```ts
optional $eq: DecisionInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:1951](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1951)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:1959](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1959)

Checks if the current property exists.

***

### $in?

```ts
optional $in: DecisionInstanceStateEnum[];
```

Defined in: [gen/types.gen.ts:1963](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1963)

Checks if the property matches any of the provided values.

***

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:1968](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1968)

***

### $neq?

```ts
optional $neq: DecisionInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:1955](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1955)

Checks for inequality with the provided value.

***

### $notIn?

```ts
optional $notIn: DecisionInstanceStateEnum[];
```

Defined in: [gen/types.gen.ts:1967](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1967)

Checks if the property matches none of the provided values.
