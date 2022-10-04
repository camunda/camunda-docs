---
id: feel-variables
title: Variables
description: "This document outlines variables and examples."
---

### Access variables

Access the value of a variable by its variable name.

```feel
a + b
```

If the value of the variable is a context, a [context entry can be accessed](/docs/components/modeler/feel/language-guide/feel-context-expressions#get-entry-or-path) by its key.

```feel
a.b
```

:::tip

Use a [null-check](/docs/components/modeler/feel/language-guide/feel-boolean-expressions#null-check) if the variable can be `null` or is optional.

```feel
a != null and a.b > 10
```

:::

### Escape variable names

The name of a variable can be any alphanumeric string including `_` (an underscore). For a
combination of words, it is recommended to use `camelCase` or the `snake_case` format.

If a variable name or context key contains any special character (e.g. whitespace, dash, etc.,) the name can be placed in single backticks (e.g. `` `foo bar` ``).

```feel
`first name`

`tracking-id`

order.`total price`
```
