---
title: "Type Alias: SetVariableRequest"
sidebar_label: "SetVariableRequest"
mdx:
  format: md
---

# Type Alias: SetVariableRequest

```ts
type SetVariableRequest = object;
```

## Properties

### local?

```ts
optional local?: boolean;
```

If set to `true`, the variables are merged strictly into the local scope (as specified
by the `elementInstanceKey`). Otherwise, the variables are propagated to upper scopes
and set at the outermost one.

Let's consider the following example:
There are two scopes '1' and '2'. Scope '1' is the parent scope of '2'. The effective
variables of the scopes are:
1 => { "foo" : 2 }
2 => { "bar" : 1 }

An update request with elementInstanceKey as '2', variables { "foo": 5 }, and local set
to `true` leaves scope '1' unchanged and adjusts scope '2' to { "bar": 1, "foo": 5 }. By
default, with local set to `false`, scope '1' will be { "foo": 5 } and scope '2' will be
{ "bar": 1 }.

---

### operationReference?

```ts
optional operationReference?: OperationReference;
```

---

### variables

```ts
variables: object;
```

JSON object representing the variables to set in the element’s scope.

#### Index Signature

```ts
[key: string]: unknown
```
