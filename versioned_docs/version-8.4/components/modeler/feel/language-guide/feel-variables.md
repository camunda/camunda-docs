---
id: feel-variables
title: Variables
description: "This document outlines variables and examples."
---

import MarkerCamundaExtension from "@site/src/mdx/MarkerCamundaExtension";

### Access variables

Access the value of a variable by its variable name.

```feel
a + b
```

If the value of the variable is a context, a [context entry can be accessed](/components/modeler/feel/language-guide/feel-context-expressions.md#get-entrypath) by its key.

```feel
a.b
```

If no variable exists with the given name, the expression returns `null`.

:::tip

Use a [null-check](/components/modeler/feel/language-guide/feel-boolean-expressions.md#null-check) if the variable can be `null` or is optional.

```feel
a != null and a.b > 10
```

:::

### Variable names

The name of a variable can be any alphanumeric string including the `_` symbol. For a combination of
words, it's recommended to use the `camelCase` or the `snake_case` format. The `kebab-case` format
is not allowed because it contains the operator `-`.

When accessing a variable in an expression, keep in mind the variable name is case-sensitive.

Restrictions of a variable name:

- It may not start with a _number_ (e.g. `1stChoice` is not allowed; you can
  use `firstChoice` instead).
- It may not contain _whitespaces_ (e.g. `order number` is not allowed; you can use `orderNumber`
  instead).
- It may not contain an _operator_ (e.g. `+`, `-`, `*`, `/`, `=`, `>`, `<`, `?`, `.`).
- It may not be a _literal_ (e.g. `null`, `true`, `false`) or a _keyword_ (e.g. `function`, `if`
  , `then`, `else`, `for`, `return`, `between`, `instance`, `of`, `not`, `in`, `and`, `or`, `some`,
  `every`, `satisfies`).

### Escape variable names

<MarkerCamundaExtension></MarkerCamundaExtension>

If a variable name or a context key contains any special character (e.g. whitespace, dash, etc.)
then the name can be wrapped into single backquotes/backticks (e.g. `` `foo bar` ``).

```feel
`first name`

`tracking-id`

order.`total price`
```

:::tip
Use the [`get value()`](/components/modeler/feel/builtin-functions/feel-built-in-functions-context.md#get-valuecontext-key) function
to retrieve the context value of an arbitrary key.

```feel
get value(order, "total price")
```

:::
