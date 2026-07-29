---
id: agent-fromai-contract
title: Agent fromAi() contract
description: Reference for the `agent-fromai-contract` rule.
---

import MarkerGuideline from "@site/src/mdx/MarkerGuideline";
import DeclaringAgenticSubprocess from "./_declaring-agentic-subprocess.md";

The [`fromAi()`](../../../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md) FEEL function declares a tool's LLM-supplied inputs inside an [AI agent sub-process](../../../../agentic-orchestration/agentic-orchestration-overview.md). This rule catches the **structural** breaks the AI Agent connector cannot recover from: the call resolves to nothing at runtime, with no error and no value. Because the failure is silent and deterministic, these are reported as errors.

The description argument is optional, so a call with no description is valid and is not reported.

## <MarkerGuideline.Invalid /> Contract breaks

The rule reports:

- **Key is not a FEEL path**: the first argument must be a path expression, not a string literal (`"toolCall.url"`), a number, `null`, an arithmetic expression, bracket notation (`toolCall["url"]`), or a conditional expression (`if ... then ... else ...`). The connector requires a plain reference regardless of which branch would apply at runtime, so a conditional key never resolves.
- **Key does not start with `toolCall.`**: the connector only populates fields of the `toolCall` context, so a bare name (`url`) or a different root (`context.url`) is never filled in.
- **Key is nested**: the connector uses the last path segment as the parameter name, so `toolCall.input.filter` registers `filter` but reads a path the connector never populates. Use a single name: `toolCall.filter`.
- **Key is declared twice in one tool**: all `fromAi()` calls on a tool's entry element combine into one input schema, so a duplicated key collides. Declare each key once and reference the variable directly elsewhere.
- **Wrong function-name casing**: the name is case-sensitive. Use `fromAi`, not `fromai` or `fromAI`.
- **Description is not a string literal** (a number, `null`, a variable reference, or any other expression): the connector reads the description as fixed text to build the tool schema before the LLM ever runs, so it must be a literal string. A variable reference cannot be resolved this way regardless of what process data is available; there is no case where a non-literal description works. Use a quoted string, for example `fromAi(toolCall.url, "The URL to fetch.")`.
- **`fromAi()` in the wrong place**: the connector populates `toolCall` only for a tool's inputs, and only on the tool's entry element. A call in an output mapping, in a sequence-flow condition, on a non-entry element, or outside an agentic ad-hoc sub-process resolves to null. Define the parameter in an input mapping on the entry element and read the resulting variable where you need it.

  A tool's entry element is the activity with no incoming sequence flow; anything reached through a sequence flow is part of the tool's internal flow, not the tool itself:

  ![Two activities in a tool's sub-flow: the first has no incoming sequence flow and is the tool's entry element, the second is reached by a sequence flow and is not](./img/agent-fromai-contract/entry-element.png)

## <MarkerGuideline.Valid /> Correct `fromAi()` usage

A single-segment `toolCall` path with a description:

```feel
= fromAi(toolCall.url, "The URL to fetch. Must be an absolute URL including scheme.")
```

A `fromAi()` call in an ad hoc sub-process that isn't recognized as a tool container is itself reported.

<DeclaringAgenticSubprocess />

If this tool isn't meant to be agent-driven, the other fix is to remove the `fromAi()` call instead of marking the sub-process.

Clicking this report in the Problems panel selects the tool task, not the ad-hoc sub-process. The property to add is on the sub-process, so select it yourself in the diagram; the Problems panel does not navigate there for you.

## References

- [AI Agent tool definitions](../../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md)
- [`fromAi()` FEEL function](../../../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md)
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/agent-fromai-contract.js)
