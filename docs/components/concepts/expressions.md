---
id: expressions
title: "Expressions"
description: "Expressions can be used to access variables and calculate values dynamically."
---

Expressions can be used to access variables and calculate values dynamically.

This is particularly useful when [automating a process using BPMN](../../guides/automating-a-process-using-bpmn.md) and [orchestrating human tasks](../../guides/getting-started-orchestrate-human-tasks.md).

The following attributes of BPMN elements _require_ an expression:

- Sequence flow on an exclusive gateway: [condition](/components/modeler/bpmn/exclusive-gateways/exclusive-gateways.md#conditions)
- Message catch event/receive task: [correlation key](/components/modeler/bpmn/message-events/message-events.md#messages)
- Multi-instance activity: [input collection](/components/modeler/bpmn/multi-instance/multi-instance.md#defining-the-collection-to-iterate-over), [output element](/components/modeler/bpmn/multi-instance/multi-instance.md#collecting-the-output)
- Input/output variable mappings: [source](variables.md#inputoutput-variable-mappings)

Additionally, the following attributes of BPMN elements can define an expression _optionally_, instead of a static value:

- Timer catch event: [timer definition](/components/modeler/bpmn/timer-events/timer-events.md#timers)
- Message catch event/receive task: [message name](/components/modeler/bpmn/message-events/message-events.md#messages)
- Service task/business rule task/script task/send task: [job type](/components/modeler/bpmn/service-tasks/service-tasks.md#task-definition), [job retries](/components/modeler/bpmn/service-tasks/service-tasks.md#task-definition)
- User task: [assignee](/components/modeler/bpmn/user-tasks/user-tasks.md#assignments), [candidateGroups](/components/modeler/bpmn/user-tasks/user-tasks.md#assignments)
- Call activity: [process id](/components/modeler/bpmn/call-activities/call-activities.md#defining-the-called-process)

And many more.

## Expressions vs. static values

Some attributes of BPMN elements—like the timer definition of a timer catch event—can be defined in one of two ways:

- As an expression (e.g. `= remainingTime`)
- As a static value (e.g. `PT2H`)

Expressions always start with an **equals sign** (**=**). For example, `= order.amount > 100`. The text following the equal sign is the actual expression. For example, `order.amount > 100` checks if the amount of the order is greater than 100.

If the element does not start with the prefix, it is used as a static value. A static value is used either as a string (e.g. job type) or as a number (e.g. job retries). A string value must not be enclosed in quotes.

:::note
An expression can also define a static value by using literals (e.g. `= "foo"`, `= 21`, `= true`, `= [1,2,3]`, `= {x: 22}`, etc.)
:::

## The expression language

An expression is written in **FEEL** (**Friendly Enough Expression Language**). FEEL is part of the OMG's **DMN** (**Decision Model and Notation**) specification. It is designed to have the following properties:

- Free of side effects
- Simple data model with JSON-like object types: numbers, dates, strings, lists, and contexts
- Simple syntax designed for business professionals and developers
- Three-valued logic (true, false, null)

Camunda 8 integrates the [FEEL Scala](https://github.com/camunda/feel-scala) engine to evaluate FEEL expressions.

Read more about FEEL expressions and how to use them on the following pages:

- [Data types](/docs/components/modeler/feel/language-guide/feel-data-types.md)
- [Expressions and operators](/docs/components/modeler/feel/language-guide/feel-expressions-introduction.md)
- [Available built-in functions](/docs/components/modeler/feel/builtin-functions/feel-built-in-functions-introduction.md)

## Next steps

- [FEEL](/components/modeler/feel/what-is-feel.md)
- [DMN specification](https://www.omg.org/spec/DMN/About-DMN/)
