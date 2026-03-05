---
title: "Type Alias: AdvancedScopeKeyFilter"
sidebar_label: "AdvancedScopeKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedScopeKeyFilter

```ts
type AdvancedScopeKeyFilter = object;
```

Defined in: [gen/types.gen.ts:4848](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4848)

Advanced filter

Advanced ScopeKey filter.

## Properties

### $eq?

```ts
optional $eq: ScopeKey;
```

Defined in: [gen/types.gen.ts:4852](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4852)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:4860](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4860)

Checks if the current property exists.

***

### $in?

```ts
optional $in: ScopeKey[];
```

Defined in: [gen/types.gen.ts:4864](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4864)

Checks if the property matches any of the provided values.

***

### $neq?

```ts
optional $neq: ScopeKey;
```

Defined in: [gen/types.gen.ts:4856](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4856)

Checks for inequality with the provided value.

***

### $notIn?

```ts
optional $notIn: ScopeKey[];
```

Defined in: [gen/types.gen.ts:4868](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4868)

Checks if the property matches none of the provided values.
