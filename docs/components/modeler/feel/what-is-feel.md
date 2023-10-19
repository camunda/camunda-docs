---
id: what-is-feel
title: What is FEEL?
description: "FEEL is a part of DMN specification of the Object Management Group."
---

import { MarkerCamundaExtension } from "@site/src/mdx/MarkerCamundaExtension";

FEEL, which stands for "Friendly Enough Expression Language", is designed to write expressions in a way that is easily understood by business professionals and developers. In Camunda, FEEL is used to define expressions in the context of both BPMN and DMN diagrams. FEEL is a part of
the [DMN specification](http://www.omg.org/spec/DMN/) of the Object Management Group (OMG).

## Learning FEEL

To understand FEEL better and how it is integrated into Camunda, you can explore the following resources:

- [Expressions in Camunda 8](/docs/components/concepts/expressions.md): Learn how expressions are used within our platform
- [FEEL Syntax and Operators](./language-guide/feel-expressions-introduction.md): Learn how to write basic expression
- [Built-in Functions](./builtin-functions/feel-built-in-functions-introduction.md): Read about functions the FEEL engine offers

## FEEL Engines

To evaluate your expressions, Camunda employs two distinct FEEL engines, depending on the use-case. While both support the basic FEEL syntax and functions, certain extensions are only available in FEEL Scala. You can try out your expressions in our playgrounds.

### FEEL Scala (Java FEEL Engine)

<MarkerCamundaExtension />

[**FEEL Scala**](https://github.com/camunda/feel-scala) is a Java-based FEEL engine integrated into the backend of our platform. It is primarily responsible for evaluating expressions in BPMN diagrams and DMN tables. Functions marked as "Camunda Extension" are not part of the FEEL specification are only supported by FEEL Scala.

Try out expressions in the [FEEL Scala Playground](https://camunda.github.io/feel-scala/docs/playground/).

### feelin (JavaScript FEEL Engine)

[**feelin**](https://github.com/nikku/feelin) is a JavaScript-based FEEL engine designed for use in the browser and is used by [Camunda Forms](../forms/camunda-forms-reference.md) and [templating](../forms/configuration/forms-config-templating-syntax.md). Functions marked as "Camunda Extension" are **not** supported by feelin.

Try out expressions in the [feelin Playground](https://nikku.github.io/feel-playground/).
