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

Defined in: [gen/types.gen.ts:2780](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2780)

Advanced filter

Basic advanced string filter.

## Properties

### $eq?

```ts
optional $eq: string;
```

Defined in: [gen/types.gen.ts:2784](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2784)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:2792](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2792)

Checks if the current property exists.

***

### $in?

```ts
optional $in: string[];
```

Defined in: [gen/types.gen.ts:2796](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2796)

Checks if the property matches any of the provided values.

***

### $neq?

```ts
optional $neq: string;
```

Defined in: [gen/types.gen.ts:2788](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2788)

Checks for inequality with the provided value.

***

### $notIn?

```ts
optional $notIn: string[];
```

Defined in: [gen/types.gen.ts:2800](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2800)

Checks if the property matches none of the provided values.
