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

Defined in: [gen/types.gen.ts:8158](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8158)

## Properties

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:8162](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8162)

Name of the variable.

***

### value

```ts
value: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:8170](https://github.com/camunda/orchestration-cluster-api-js/blob/e2c8d04280f4991eb5e2564688bc9dbce3c748a8/src/gen/types.gen.ts#L8170)

The value of the variable.
Variable values in filters need to be in serialized JSON format. For example, a variable
with string value `myValue` can be found with the filter value `"myValue"`. Consider
appropriate escaping for special characters in JSON strings when constructing filter values.
