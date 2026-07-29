---
id: agent-tool-documentation
title: Agent tool documentation
description: Reference for the `agent-tool-documentation` rule.
---

import MarkerGuideline from "@site/src/mdx/MarkerGuideline";
import DeclaringAgenticSubprocess from "./_declaring-agentic-subprocess.md";

Tools inside an [AI agent sub-process](../../../../agentic-orchestration/agentic-orchestration-overview.md) need a documentation entry. The AI agent reads it to decide which tool to call; without it, the agent falls back to the element's name, usually too vague to select the tool reliably. Missing documentation degrades tool selection rather than breaking anything outright, so this rule reports a warning, not an error. An undocumented tool can test well in development and then fail in production because the LLM never selects it.

To fix this problem, select the tool's entry element, open the **Documentation** section in the properties panel, and describe what the tool does and when the agent should use it.

The rule checks the tool's entry element: the activity with no incoming sequence flow. Activities reached through a sequence flow are part of the tool's internal flow and don't need their own documentation; event sub-processes are skipped too, since they're triggered by events, not called by the agent:

![Two activities in a tool's sub-flow: the first has no incoming sequence flow and is the tool's entry element, the second is reached by a sequence flow and is not](./img/agent-tool-documentation/entry-element.png)

## <MarkerGuideline.Invalid /> No documentation

The tool's entry activity has no documentation text (or only whitespace). The agent only sees the element name, for example `Fetch URL`, and has to guess what the tool does, which inputs matter, and when to use it.

## <MarkerGuideline.Valid /> Documentation provided

The tool's entry activity carries a documentation entry such as:

> Fetches the contents of a web page. Use this when the user provides or asks about a URL. Returns the raw response body.

A good tool description covers three things: what the tool does, when the agent should use it, and what it returns.

<DeclaringAgenticSubprocess />

## References

- [Agentic orchestration](../../../../agentic-orchestration/agentic-orchestration-overview.md)
- [AI Agent tool definitions](../../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md)
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/agent-tool-documentation.js)
