---
id: feel
title: FEEL
description: Reference for the `feel` rule.
---

import MarkerGuideline from "@site/src/mdx/MarkerGuideline";

When using the [FEEL expression language](../../../../feel/what-is-feel/), you must specify a valid expression.

## <MarkerGuideline.Invalid /> Invalid FEEL expression

A common cause of this warning is using single quotes for a string literal. FEEL requires double quotes for strings, so an expression like `'type'` is unparsable.

![Invalid FEEL expression](./img/feel/wrong.png)

## <MarkerGuideline.Valid /> Valid FEEL expression

Use double quotes for string literals, for example `"type"`, to make the expression valid.

![Valid FEEL expression](./img/feel/right.png)

## References

- [FEEL expressions](../../../../feel/what-is-feel/)
- [FEEL Scala Playground](https://camunda.github.io/feel-scala/docs/playground/) to try out expressions
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/feel.js)
