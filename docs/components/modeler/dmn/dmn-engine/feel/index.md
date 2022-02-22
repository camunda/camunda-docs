---
id: dmn-engine-feel
title: "FEEL Engine"
---

FEEL is part of the DMN specification and stands for "Friendly Enough Expression Language". You can 
use it to evaluate expressions in a decision table. Camunda Platform currently supports FEEL in version 1.2.

You can use the Expression Language in the following DMN Notation Elements:

* [Input Expressions]
* [Input Entries]
* [Output Entries]
* [Literal Expressions]

This documentation covers everything integration-specific about the **FEEL Scala Engine** in the 
Camunda DMN Engine. By default, Camunda Platform relies on the [FEEL Scala Engine][] (opens external link) 
in version `1.11.0`. 

:::note Heads up! 
If you come from a Camunda Platform version <= 7.12.x and already use FEEL, 
please read the documentation about the [FEEL Engine Legacy Behavior](./legacy-behavior.md).
:::

[FEEL Scala Engine]: https://github.com/camunda/feel-scala
[//]: # [input entries]: {{< ref "/reference/dmn/decision-table/rule.md#input-entry-condition" >}}
[//]: # [Input Expressions]: {{< ref "/reference/dmn/decision-table/input.md#input-expression" >}}
[//]: # [Output Entries]: {{< ref "/reference/dmn/decision-table/rule.md#output-entry-conclusion" >}}
[//]: # [Literal Expressions]: {{< ref "/reference/dmn/decision-literal-expression/_index.md" >}}