---
title: "Type Alias: AdvancedProcessInstanceKeyFilter"
sidebar_label: "AdvancedProcessInstanceKeyFilter"
mdx:
  format: md
---

# Type Alias: AdvancedProcessInstanceKeyFilter

```ts
type AdvancedProcessInstanceKeyFilter = object;
```

Defined in: [gen/types.gen.ts:4714](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4714)

Advanced filter

Advanced ProcessInstanceKey filter.

## Properties

### $eq?

```ts
optional $eq: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4718](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4718)

Checks for equality with the provided value.

***

### $exists?

```ts
optional $exists: boolean;
```

Defined in: [gen/types.gen.ts:4726](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4726)

Checks if the current property exists.

***

### $in?

```ts
optional $in: ProcessInstanceKey[];
```

Defined in: [gen/types.gen.ts:4730](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4730)

Checks if the property matches any of the provided values.

***

### $neq?

```ts
optional $neq: ProcessInstanceKey;
```

Defined in: [gen/types.gen.ts:4722](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4722)

Checks for inequality with the provided value.

***

### $notIn?

```ts
optional $notIn: ProcessInstanceKey[];
```

Defined in: [gen/types.gen.ts:4734](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L4734)

Checks if the property matches none of the provided values.
