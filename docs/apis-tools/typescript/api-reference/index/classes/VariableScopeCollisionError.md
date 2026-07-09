---
title: "Class: VariableScopeCollisionError"
sidebar_label: "VariableScopeCollisionError"
mdx:
  format: md
---

# Class: VariableScopeCollisionError

Raised when a declared variable name is observed at more than one scope (for example a local
variable shadowing a process-level variable). The result would be ambiguous, so the search
fails loudly rather than silently picking one. Pass an explicit `scopeKey` to disambiguate.

## Extends

- [`TypedVariablesError`](TypedVariablesError.md)

## Constructors

### Constructor

```ts
new VariableScopeCollisionError(variableName, scopeKeys): VariableScopeCollisionError;
```

#### Parameters

##### variableName

`string`

##### scopeKeys

readonly `string`[]

#### Returns

`VariableScopeCollisionError`

#### Overrides

[`TypedVariablesError`](TypedVariablesError.md).[`constructor`](TypedVariablesError.md#constructor)

## Properties

### scopeKeys

```ts
readonly scopeKeys: readonly string[];
```

---

### variableName

```ts
readonly variableName: string;
```
