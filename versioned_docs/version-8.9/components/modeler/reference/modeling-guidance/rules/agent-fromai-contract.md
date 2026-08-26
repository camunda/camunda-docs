---
id: agent-fromai-contract
title: Agent fromAi() contract
description: Reference for the `agent-fromai-contract` rule.
---

import MarkerGuideline from "@site/src/mdx/MarkerGuideline";
import DeclaringAgenticSubprocess from "./\_declaring-agentic-subprocess.md";

The [`fromAi()`](../../../../modeler/feel/builtin-functions/feel-built-in-functions-ai-agent.md) FEEL function declares a tool's LLM-supplied inputs within an [AI Agent sub-process](../../../../agentic-orchestration/agentic-orchestration-overview.md). A malformed call resolves to nothing at runtime without producing an error, so malformed calls are reported as errors. A call without a description is valid and is not reported.

## <MarkerGuideline.Invalid /> Contract breaks

The rule reports the following problems:

- **Key is not a FEEL path**: The first argument must be a path expression, such as `toolCall.url`, rather than a string literal, number, `null`, bracket notation, or conditional expression.
- **Key does not start with `toolCall.`**: The connector populates only fields in the `toolCall` context.
- **Key is nested**: The connector uses only the last path segment as the parameter name. Use a single name, such as `toolCall.filter`.
- **Key is declared twice in one tool**: Duplicate keys collide because a tool's `fromAi()` calls are combined into a single input schema.
- **Wrong function-name casing**: The function name is case-sensitive. Use `fromAi`.
- **Description is not a string literal**: The description must be a quoted string, for example, `fromAi(toolCall.url, "The URL to fetch.")`.
- **`fromAi()` is in the wrong place**: The function is valid only in an input mapping on the tool's entry element. This is the activity with no incoming sequence flow. Anywhere else, it resolves to `null`:

![Two activities in a tool's sub-flow: the first has no incoming sequence flow and is the tool's entry element, while the second is reached by a sequence flow and is not](./img/agent-fromai-contract/entry-element.png)

## <MarkerGuideline.Valid /> Correct `fromAi()` usage

Use a single-segment `toolCall` path with a description:

```feel
= fromAi(toolCall.url, "The URL to fetch. Must be an absolute URL including scheme.")
```

A `fromAi()` call within an ad-hoc sub-process that is not recognized as a tool container is also reported. If the tool is not intended to be agent-driven, remove the `fromAi()` call instead.

<DeclaringAgenticSubprocess />

Clicking a tool container report in the Problems panel selects the tool task rather than the ad-hoc sub-process, and the Problems panel does not navigate to the sub-process for you. Select the sub-process directly in the diagram to apply either fix.

## See also

- [AI Agent tool definitions](../../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md)
- [`fromAi()` FEEL function](../../../../modeler/feel/builtin-functions/feel-built-in-functions-ai-agent.md)
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/agent-fromai-contract.js)
