---
id: feel-function-contracts
title: FEEL function contracts
description: Reference for the `feel-function-contracts` rule.
---

import MarkerGuideline from "@site/src/mdx/MarkerGuideline";

Input parameters inside an [AI agent sub-process](../../../../agentic-orchestration/agentic-orchestration-overview.md) that use the [`fromAi()`](../../../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md) FEEL function must follow the function contract. The AI Agent connector builds each tool's input schema from these calls, so a broken contract means the agent supplies nothing and the expression resolves to null at runtime, without an error.

## <MarkerGuideline.Invalid /> Contract violations

The rule detects these issues:

- **Key is not a FEEL path**: the first argument must be a path expression, not a string literal (`"toolCall.url"`), a number, `null`, an arithmetic expression, or bracket notation (`toolCall["url"]`).
- **Key doesn't start with `toolCall.`**: the connector only populates fields of the `toolCall` context. A bare name like `url` or a different path like `context.url` is never filled in.
- **Key is nested**: the connector uses the last path segment as the parameter name, so `toolCall.input.filter` registers the parameter `filter` but the expression reads a path the connector never populates. Use a single name: `toolCall.filter`.
- **Key is declared twice in one tool**: all `fromAi()` calls of a tool's entry element combine into one input schema, so a duplicated key collides. Declare each key once and reference the variable directly elsewhere.
- **`fromAi()` on a non-entry element**: the connector resolves tool inputs only from the tool's entry element (the activity with no incoming sequence flows). A `fromAi()` call on a downstream element is ignored at runtime. Define the parameter on the entry element and read the `toolCall` variable directly where you need it.
- **Wrong function name casing**: the function name is case-sensitive. Use `fromAi`, not `fromai` or `fromAI`.
- **Description is missing, blank, or not a string literal**: the second argument should be a quoted string. It is syntactically optional, but the LLM reads it to decide what value to supply, so a missing or empty description degrades the agent's accuracy.
- **`fromAi()` in the wrong place**: the connector only populates `toolCall` for a tool's inputs. `fromAi()` in an output mapping, in a sequence flow condition, or outside an agentic ad-hoc sub-process resolves to null at runtime. Define the parameter in an input mapping on the tool's entry element and read the resulting variable where you need it.

## <MarkerGuideline.Valid /> Correct `fromAi()` usage

The simplest correct form is a single-segment `toolCall` path plus a description:

```feel
= fromAi(toolCall.url, "The URL to fetch. Must be an absolute URL including scheme.")
```

`fromAi()` also works nested inside larger expressions, for example a context object or a concatenation:

```feel
= { q: fromAi(toolCall.query, "The search term."), limit: 10 }
```

The documented signature has up to five parameters: `fromAi(value, description, type, schema, options)`. The optional third, fourth, and fifth arguments define the parameter's type, a JSON Schema, and options such as marking the parameter optional. They are part of the contract and don't trigger this rule:

```feel
= fromAi(toolCall.maxResults, "How many results to return.", "number")
```

## References

- [AI Agent tool definitions](../../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md)
- [`fromAi()` FEEL function](../../../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md)
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/feel-function-contracts.js)
