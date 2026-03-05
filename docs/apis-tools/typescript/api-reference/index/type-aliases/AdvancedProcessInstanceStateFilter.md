---
title: "Type Alias: AdvancedProcessInstanceStateFilter"
sidebar_label: "AdvancedProcessInstanceStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedProcessInstanceStateFilter

```ts
type AdvancedProcessInstanceStateFilter = object;
```

Defined in: [gen/types.gen.ts:6792](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6792)

Advanced filter

Advanced ProcessInstanceStateEnum filter.

## Properties

### $eq?

```ts
optional $eq: ProcessInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:6796](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6796)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:6804](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6804)

Checks if the current property exists.

***

### $in?

```ts
optional $in: ProcessInstanceStateEnum[];
```

Defined in: [gen/types.gen.ts:6808](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6808)

Checks if the property matches any of the provided values.

***

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:6809](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6809)

***

### $neq?

```ts
optional $neq: ProcessInstanceStateEnum;
```

Defined in: [gen/types.gen.ts:6800](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L6800)

Checks for inequality with the provided value.
