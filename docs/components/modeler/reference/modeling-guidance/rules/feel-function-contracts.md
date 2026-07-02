---
id: feel-function-contracts
title: FEEL function contracts
description: Reference for the `feel-function-contracts` rule.
---

import MarkerGuideline from "@site/src/mdx/MarkerGuideline";

Input parameters inside an [AI agent sub-process](../../../../bpmn/agent-tasks/) that use `fromAi()` must follow the function contract. This ensures the AI agent can correctly interpret and supply each parameter at runtime.

## <MarkerGuideline.Invalid /> Missing or incorrect `fromAi()` usage

Common issues detected by this rule:

- **Key is not a FEEL path**: the first argument must be a path expression starting with `toolCall.`, for example `toolCall.url`. String literals, numbers, and bare variable names are not valid.
- **Wrong function name casing**: the function name is case-sensitive. Use `fromAi`, not `fromai` or `fromAI`.
- **Description is missing or blank**: the second argument should be a quoted string describing what the agent should supply. An empty string or absent argument reduces LLM accuracy.

## <MarkerGuideline.Valid /> Correct `fromAi()` usage

```feel
= fromAi(toolCall.url, "The URL to fetch. Must be an absolute URL including scheme.")
```

Both arguments are present: a `toolCall.*` path as the key, and a descriptive string as the second argument.

## References

- [Agent tasks](../../../../bpmn/agent-tasks/)
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/feel-function-contracts.js)
