---
title: "Type Alias: VariableValueFilterProperty"
sidebar_label: "VariableValueFilterProperty"
mdx:
  format: md
---

# Type Alias: VariableValueFilterProperty

```ts
type VariableValueFilterProperty = object;
```

Defined in: [gen/types.gen.ts:8044](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8044)

## Properties

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:8048](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8048)

Name of the variable.

***

### value

```ts
value: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:8056](https://github.com/camunda/orchestration-cluster-api-js/blob/bf38adc466af5e438cf33b8fffb8a3bbae4784dc/src/gen/types.gen.ts#L8056)

The value of the variable.
Variable values in filters need to be in serialized JSON format. For example, a variable
with string value `myValue` can be found with the filter value `"myValue"`. Consider
appropriate escaping for special characters in JSON strings when constructing filter values.
