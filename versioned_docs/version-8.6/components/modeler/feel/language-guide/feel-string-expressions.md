---
id: feel-string-expressions
title: String expressions
description: "This document outlines string expressions and examples."
---

### Literal

Creates a new string value.

```feel
"valid"
```

### Addition/concatenation

An addition concatenates the strings. The result is a string containing the characters of both strings.

```feel
"foo" + "bar"
// "foobar"
```

:::tip

The concatenation is only available for string values. For other types, you can use
the [`string()`](/components/modeler/feel/builtin-functions/feel-built-in-functions-conversion.md#stringfrom) function to convert
the value into a string first.

```feel
"order-" + string(123)
```

:::
