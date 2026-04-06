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

Defined in: [gen/types.gen.ts:8187](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8187)

## Properties

### name

```ts
name: string;
```

Defined in: [gen/types.gen.ts:8191](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8191)

Name of the variable.

---

### value

```ts
value: StringFilterProperty;
```

Defined in: [gen/types.gen.ts:8199](https://github.com/camunda/orchestration-cluster-api-js/blob/2d7928a5d3d0489482db52bc887c3dae115de89a/src/gen/types.gen.ts#L8199)

The value of the variable.
Variable values in filters need to be in serialized JSON format. For example, a variable
with string value `myValue` can be found with the filter value `"myValue"`. Consider
appropriate escaping for special characters in JSON strings when constructing filter values.
