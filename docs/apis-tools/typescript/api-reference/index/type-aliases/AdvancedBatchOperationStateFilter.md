---
title: "Type Alias: AdvancedBatchOperationStateFilter"
sidebar_label: "AdvancedBatchOperationStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedBatchOperationStateFilter

```ts
type AdvancedBatchOperationStateFilter = object;
```

Defined in: [gen/types.gen.ts:1084](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1084)

Advanced filter

Advanced BatchOperationStateEnum filter.

## Properties

### $eq?

```ts
optional $eq: BatchOperationStateEnum;
```

Defined in: [gen/types.gen.ts:1088](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1088)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:1096](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1096)

Checks if the current property exists.

***

### $in?

```ts
optional $in: BatchOperationStateEnum[];
```

Defined in: [gen/types.gen.ts:1100](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1100)

Checks if the property matches any of the provided values.

***

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:1101](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1101)

***

### $neq?

```ts
optional $neq: BatchOperationStateEnum;
```

Defined in: [gen/types.gen.ts:1092](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L1092)

Checks for inequality with the provided value.
