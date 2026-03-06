---
title: "Type Alias: AdvancedVariableKeyFilter"
sidebar_label: "AdvancedVariableKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedVariableKeyFilter

```ts
type AdvancedVariableKeyFilter = object;
```

Defined in: [gen/types.gen.ts:4881](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4881)

Advanced filter

Advanced VariableKey filter.

## Properties

### $eq?

```ts
optional $eq: VariableKey;
```

Defined in: [gen/types.gen.ts:4885](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4885)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:4893](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4893)

Checks if the current property exists.

***

### $in?

```ts
optional $in: VariableKey[];
```

Defined in: [gen/types.gen.ts:4897](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4897)

Checks if the property matches any of the provided values.

***

### $neq?

```ts
optional $neq: VariableKey;
```

Defined in: [gen/types.gen.ts:4889](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4889)

Checks for inequality with the provided value.

***

### $notIn?

```ts
optional $notIn: VariableKey[];
```

Defined in: [gen/types.gen.ts:4901](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4901)

Checks if the property matches none of the provided values.
