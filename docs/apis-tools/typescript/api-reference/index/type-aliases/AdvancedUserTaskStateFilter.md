---
title: "Type Alias: AdvancedUserTaskStateFilter"
sidebar_label: "AdvancedUserTaskStateFilter"
mdx:
  format: md
---

# Type Alias: AdvancedUserTaskStateFilter

```ts
type AdvancedUserTaskStateFilter = object;
```

Defined in: [gen/types.gen.ts:7748](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7748)

Advanced filter

Advanced UserTaskStateEnum filter.

## Properties

### $eq?

```ts
optional $eq: UserTaskStateEnum;
```

Defined in: [gen/types.gen.ts:7752](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7752)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:7760](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7760)

Checks if the current property exists.

***

### $in?

```ts
optional $in: UserTaskStateEnum[];
```

Defined in: [gen/types.gen.ts:7764](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7764)

Checks if the property matches any of the provided values.

***

### $like?

```ts
optional $like: LikeFilter;
```

Defined in: [gen/types.gen.ts:7765](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7765)

***

### $neq?

```ts
optional $neq: UserTaskStateEnum;
```

Defined in: [gen/types.gen.ts:7756](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L7756)

Checks for inequality with the provided value.
