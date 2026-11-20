---
title: "Class: TypedVariablesError"
sidebar_label: "TypedVariablesError"
mdx:
  format: md
---

# Class: TypedVariablesError

Base class for all typed-variable errors, so callers can catch the whole family.

## Extends

- `Error`

## Extended by

- [`VariableDeserializationError`](VariableDeserializationError.md)
- [`VariableScopeCollisionError`](VariableScopeCollisionError.md)

## Constructors

### Constructor

```ts
new TypedVariablesError(message, options?): TypedVariablesError;
```

#### Parameters

##### message

`string`

##### options?

###### cause?

`unknown`

#### Returns

`TypedVariablesError`

#### Overrides

```ts
Error.constructor;
```
