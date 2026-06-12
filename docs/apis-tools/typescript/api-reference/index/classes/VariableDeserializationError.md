---
title: "Class: VariableDeserializationError"
sidebar_label: "VariableDeserializationError"
mdx:
  format: md
---

# Class: VariableDeserializationError

Raised when a variable's serialized value is not valid JSON.

## Extends

- [`TypedVariablesError`](TypedVariablesError.md)

## Constructors

### Constructor

```ts
new VariableDeserializationError(variableName, options?): VariableDeserializationError;
```

#### Parameters

##### variableName

`string`

##### options?

###### cause?

`unknown`

#### Returns

`VariableDeserializationError`

#### Overrides

[`TypedVariablesError`](TypedVariablesError.md).[`constructor`](TypedVariablesError.md#constructor)

## Properties

### variableName

```ts
readonly variableName: string;
```
