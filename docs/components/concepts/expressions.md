---
id: expressions
title: "Expressions"
description: "Expressions can be used to access variables and calculate values dynamically. This is useful when automating a process using BPMN and orchestrating human tasks."
---

Expressions can be used to access variables and calculate values dynamically.

This is particularly useful when [automating a process using BPMN](../../guides/automating-a-process-using-bpmn.md) and [orchestrating human tasks](../../guides/getting-started-orchestrate-human-tasks.md).

Some attributes of BPMN elements _require_ an expression, for example, a [sequence flow condition](/components/modeler/bpmn/exclusive-gateways/exclusive-gateways.md#conditions) on an exclusive
gateway. Other attributes can define an expression _optionally_ as an alternative to a static value, for example, a
[timer definition](/components/modeler/bpmn/timer-events/timer-events.md#timers) of a timer catch event.

## Expressions vs. static values

Some attributes of BPMN elements, like the timer definition of a timer catch event, can be defined in one of two ways:

- As an expression (e.g. `= remainingTime`)
- As a static value (e.g. `PT2H`)

Expressions always start with an **equals sign** (**=**). For example, `= order.amount > 100`. The text following the equal sign is the actual expression. For example, `order.amount > 100` checks if the amount of the order is greater than 100.

If the element does not start with the prefix, it is used as a static value. A static value is used either as a string (e.g. job type) or as a number (e.g. job retries). A string value must not be enclosed in quotes.

:::note
An expression can also define a static value by using literals (e.g. `= "foo"`, `= 21`, `= true`, `= [1,2,3]`, `= {x: 22}`, etc.)
:::

## The expression language

An expression is written in **Friendly Enough Expression Language (FEEL)**. FEEL is part of the OMG's **Decision Model and Notation (DMN)** specification. It is designed to have the following properties:

- Free of side effects
- Simple data model with JSON-like object types: numbers, dates, strings, lists, and contexts
- Syntax designed for business professionals and developers
- Three-valued logic (true, false, null)

Camunda 8 integrates the [FEEL Scala](https://github.com/camunda/feel-scala) engine to evaluate FEEL expressions.

## Next steps

Read more about FEEL expressions and how to use them on the following pages:

- [Data types](/components/modeler/feel/language-guide/feel-data-types.md)
- [Expressions and operators](/components/modeler/feel/language-guide/feel-expressions-introduction.md)
- [Available built-in functions](/components/modeler/feel/builtin-functions/feel-built-in-functions-introduction.md)
- [FEEL](/components/modeler/feel/what-is-feel.md)
- [DMN specification](https://www.omg.org/spec/DMN/About-DMN/)
