---
id: feel-error-handling
title: Error handling
description: "This document outlines the error handling."
---

FEEL doesn't define any error handling. Instead, it follows one simple rule: if something
goes wrong, return `null`.

### Null-friendly

If an expression can't be evaluated successfully, it returns `null`.

For example, in the following cases:

- No variable exists with the given name
- No context entry exists with the given key
- No function exists with the given name
- A function can't be invoked successfully with the given arguments
- A value is compared to another value of a different type
- An operation is not defined for the given values

### Handle null values

Expressions and operators can deal with `null` values. In many cases, they result also in `null`.

```feel
a.b > 10
// null

[{a: 1}, {b: 2}].a
// [1, null]

[{a: 1}, {b: 2}][a < 10]
// [{a: 1}]
```

To handle `null` values explicitly, use
a [null-check](/components/modeler/feel/language-guide/feel-boolean-expressions.md#null-check) or the
function [`get or else()`](/components/modeler/feel/builtin-functions/feel-built-in-functions-boolean.md#get-or-elsevalue-default).

```feel
a != null and a.b > 10

get or else(a, "prio-99")
```

### Assertions

By default, the evaluation of an expression doesn't fail but returns `null`. If there is a special need to fail the
evaluation under a certain condition, use the
function [`assert()`](/components/modeler/feel/builtin-functions/feel-built-in-functions-boolean.md#assertvalue-condition).

```feel
assert(a, a != null)
// returns a if a is not null
// fails if a is null

assert(b, b >= 0, "'b' should be positive")
```
