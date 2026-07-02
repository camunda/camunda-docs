---
id: agent-tool-documentation
title: Agent tool documentation
description: Reference for the `agent-tool-documentation` rule.
---

import MarkerGuideline from "@site/src/mdx/MarkerGuideline";

Tool tasks inside an [AI agent sub-process](../../../../bpmn/agent-tasks/) must have a documentation entry. The AI agent uses the documentation text to decide which tool to call and when. To fix this problem, select the tool task, open the **Documentation** section in the properties panel, and add a description of what the tool does and when the agent should use it.

## <MarkerGuideline.Invalid /> No documentation

The tool task has no documentation text.

## <MarkerGuideline.Valid /> Documentation provided

The tool task has a documentation entry describing its purpose and when the agent should use it.

## References

- [Agent tasks](../../../../bpmn/agent-tasks/)
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/agent-tool-documentation.js)
