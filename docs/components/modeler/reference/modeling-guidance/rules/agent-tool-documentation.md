---
id: agent-tool-documentation
title: Agent tool documentation
description: Reference for the `agent-tool-documentation` rule.
---

import MarkerGuideline from "@site/src/mdx/MarkerGuideline";

Tools inside an [AI agent sub-process](../../../../agentic-orchestration/agentic-orchestration-overview.md) need a documentation entry. The AI agent reads the tool's documentation to decide which tool to call and what it does. Without documentation, the agent falls back to the element's name, which is usually too vague to select the tool reliably.

This is a production-readiness concern: an undocumented tool can test well in development, where you exercise it deliberately, and then fail in production because the LLM never selects it (or selects it for the wrong request).

To fix this problem, select the tool's entry element, open the **Documentation** section in the properties panel, and describe what the tool does and when the agent should use it.

The rule checks the tool's entry element: the activity with no incoming sequence flows inside the agent sub-process. Activities reached through sequence flows belong to a tool's internal flow and don't need their own tool documentation. Event sub-processes are triggered by events, not called by the agent, and are also skipped.

## <MarkerGuideline.Invalid /> No documentation

The tool's entry activity has no documentation text (or only whitespace). The agent only sees the element name, for example `Fetch URL`, and has to guess what the tool does, which inputs matter, and when to use it.

## <MarkerGuideline.Valid /> Documentation provided

The tool's entry activity carries a documentation entry such as:

> Fetches the contents of a web page. Use this when the user provides or asks about a URL. Returns the raw response body.

A good tool description covers three things: what the tool does, when the agent should use it, and what it returns.

## Declaring a sub-process as agentic

This rule only applies inside an agentic ad-hoc sub-process. An ad-hoc sub-process is recognized as agentic when it carries a `zeebe:property` named `io.camunda.agenticai.role` with one of:

- `agent`: an embedded AI Agent sub-process, where the sub-process itself is the agent.
- `toolContainer`: a detached tools sub-process, whose tools are driven by a separate AI Agent task.

To set it, select the ad-hoc sub-process, open the **Extension properties** section in the properties panel, and add a property with name `io.camunda.agenticai.role` and value `toolContainer` (or `agent`). In the XML:

```xml
<bpmn:adHocSubProcess id="Tools">
  <bpmn:extensionElements>
    <zeebe:properties>
      <zeebe:property name="io.camunda.agenticai.role" value="toolContainer" />
    </zeebe:properties>
  </bpmn:extensionElements>
</bpmn:adHocSubProcess>
```

## References

- [Agentic orchestration](../../../../agentic-orchestration/agentic-orchestration-overview.md)
- [AI Agent tool definitions](../../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md)
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/agent-tool-documentation.js)
