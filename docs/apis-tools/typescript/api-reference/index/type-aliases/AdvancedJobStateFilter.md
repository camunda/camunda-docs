---
title: "Type Alias: AdvancedJobStateFilter"
sidebar_label: "AdvancedJobStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedJobStateFilter

```ts
type AdvancedJobStateFilter = object;
```

Defined in: [gen/types.gen.ts:4557](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4557)

Advanced filter

Advanced JobStateEnum filter.

## Properties

### $eq?

```ts
optional $eq: JobStateEnum;
```

Defined in: [gen/types.gen.ts:4561](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4561)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:4569](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4569)

Checks if the current property exists.

***

### $in?

```ts
optional $in: JobStateEnum[];
```

Defined in: [gen/types.gen.ts:4573](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4573)

Checks if the property matches any of the provided values.

***

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:4574](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4574)

***

### $neq?

```ts
optional $neq: JobStateEnum;
```

Defined in: [gen/types.gen.ts:4565](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4565)

Checks for inequality with the provided value.
