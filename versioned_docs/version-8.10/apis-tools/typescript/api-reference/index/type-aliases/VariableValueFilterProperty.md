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

## Properties

### name

```ts
name: string;
```

Name of the variable.

---

### value

```ts
value: StringFilterProperty;
```

The value of the variable.
Variable values in filters need to be in serialized JSON format. For example, a variable
with string value `myValue` can be found with the filter value `"myValue"`. Consider
appropriate escaping for special characters in JSON strings when constructing filter values.
