---
id: agent-tool-output-key
title: Agent tool output key
description: Reference for the `agent-tool-output-key` rule.
---

import MarkerGuideline from "@site/src/mdx/MarkerGuideline";

Tool tasks inside an [AI agent sub-process](../../../../bpmn/agent-tasks/) must return their result in a process variable named `toolCallResult`. The AI agent connector reads this variable after the tool executes and passes the value back to the LLM. To fix this problem, open the **Output mapping** section in the properties panel and add an output with `toolCallResult` as the target.

## <MarkerGuideline.Invalid /> No `toolCallResult` output

The tool task has output mappings, but none targets `toolCallResult`.

## <MarkerGuideline.Valid /> `toolCallResult` output mapped

The tool task has an output mapping with `toolCallResult` as the target variable.

## References

- [Agent tasks](../../../../bpmn/agent-tasks/)
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/agent-tool-output-key.js)
