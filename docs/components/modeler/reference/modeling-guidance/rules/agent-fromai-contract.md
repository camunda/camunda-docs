---
id: agent-fromai-contract
title: Agent fromAi() contract
description: Reference for the `agent-fromai-contract` rule.
---

import MarkerGuideline from "@site/src/mdx/MarkerGuideline";
import DeclaringAgenticSubprocess from "./_declaring-agentic-subprocess.md";

The [`fromAi()`](../../../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md) FEEL function declares a tool's LLM-supplied inputs inside an [AI agent sub-process](../../../../agentic-orchestration/agentic-orchestration-overview.md). A malformed call resolves to nothing at runtime with no error, so these are reported as errors. A call with no description is valid and is not reported.

## <MarkerGuideline.Invalid /> Contract breaks

The rule reports:

- **Key is not a FEEL path**: the first argument must be a path expression (e.g. `toolCall.url`), not a string literal, number, `null`, bracket notation, or a conditional expression.
- **Key does not start with `toolCall.`**: the connector only populates fields of the `toolCall` context.
- **Key is nested**: the connector uses only the last path segment as the parameter name. Use a single name, e.g. `toolCall.filter`.
- **Key is declared twice in one tool**: duplicate keys collide, since a tool's `fromAi()` calls combine into one input schema.
- **Wrong function-name casing**: the name is case-sensitive. Use `fromAi`.
- **Description is not a string literal**: it must be a quoted string, e.g. `fromAi(toolCall.url, "The URL to fetch.")`.
- **`fromAi()` in the wrong place**: only valid in an input mapping on the tool's entry element, the activity with no incoming sequence flow. Anywhere else it resolves to null:

  ![Two activities in a tool's sub-flow: the first has no incoming sequence flow and is the tool's entry element, the second is reached by a sequence flow and is not](./img/agent-fromai-contract/entry-element.png)

## <MarkerGuideline.Valid /> Correct `fromAi()` usage

A single-segment `toolCall` path with a description:

```feel
= fromAi(toolCall.url, "The URL to fetch. Must be an absolute URL including scheme.")
```

A `fromAi()` call in an ad-hoc sub-process that isn't recognized as a tool container is itself reported. If the tool isn't meant to be agent-driven, remove the `fromAi()` call instead.

<DeclaringAgenticSubprocess />

Clicking this report in the Problems panel selects the tool task, not the ad-hoc sub-process. Select the sub-process yourself in the diagram to add the property; the panel does not navigate there for you.

## References

- [AI Agent tool definitions](../../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md)
- [`fromAi()` FEEL function](../../../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md)
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/agent-fromai-contract.js)
