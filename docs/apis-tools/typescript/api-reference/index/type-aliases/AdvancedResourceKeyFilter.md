---
title: "Type Alias: AdvancedResourceKeyFilter"
sidebar_label: "AdvancedResourceKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedResourceKeyFilter

```ts
type AdvancedResourceKeyFilter = object;
```

Defined in: [gen/types.gen.ts:2351](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2351)

Advanced filter

Advanced ResourceKey filter.

## Properties

### $eq?

```ts
optional $eq: ResourceKey;
```

Defined in: [gen/types.gen.ts:2355](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2355)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:2363](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2363)

Checks if the current property exists.

***

### $in?

```ts
optional $in: ResourceKey[];
```

Defined in: [gen/types.gen.ts:2367](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2367)

Checks if the property matches any of the provided values.

***

### $neq?

```ts
optional $neq: ResourceKey;
```

Defined in: [gen/types.gen.ts:2359](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2359)

Checks for inequality with the provided value.

***

### $notIn?

```ts
optional $notIn: ResourceKey[];
```

Defined in: [gen/types.gen.ts:2371](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L2371)

Checks if the property matches none of the provided values.
