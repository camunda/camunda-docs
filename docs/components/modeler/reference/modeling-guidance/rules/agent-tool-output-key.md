---
id: agent-tool-output-key
title: Agent tool output key
description: Reference for the `agent-tool-output-key` rule.
---

import MarkerGuideline from "@site/src/mdx/MarkerGuideline";

Tools inside an [AI agent sub-process](../../../../agentic-orchestration/agentic-orchestration-overview.md) return their result to the agent through the `toolCallResult` variable. The AI Agent connector reads this variable from the tool's scope when the tool flow completes and passes the value back to the LLM.

The rule warns once per tool, on the tool's entry element, in two situations:

1. **Misdirected result**: the tool flow writes result variables, but none of them is `toolCallResult` (for example, a typo like `toolCalResult`, or a leftover `response` mapping). The tool runs and produces data, but the agent receives none of it.
2. **No result at all**: no element in the tool flow sets any result variable. The tool runs, but the agent gets no completion signal and may retry the tool or invent an outcome. Even a fire-and-forget tool such as sending an email should note the task completed, for example `= "Email sent."`.

## How a tool can set `toolCallResult`

The result can be set at any point in the tool's flow, not only on the entry element, and through several channels:

- **Output mapping**: an output with `toolCallResult` as the target variable. Mapping to a part such as `toolCallResult.statusCode` is also valid and contributes one field of the result.
- **Connectors**: templated connector tasks set process variables through their **Result variable** or **Result expression** fields instead of output mappings, for example a result expression of `= { toolCallResult: response.body }`. Connectors cannot read process variables, so this is their only channel.
- **Script tasks and business rule tasks**: set the **Result variable** to `toolCallResult` directly.
- **Multi-element tools**: when a tool is a sub-flow (tasks, gateways, events), any element in the flow can set the result. The variable is read from the tool's scope when the flow completes.

### Avoid overwrites when several elements contribute

Assigning `toolCallResult` twice overwrites the first value. When several elements contribute parts of the result, append instead of assigning, using the FEEL `context put()` function in an output mapping:

```feel
= context put(toolCallResult, "confirmation", sendResult)
```

This pattern works for elements that run in the workflow engine (script tasks, output mappings on regular tasks). It does not work in connector result expressions, because connectors cannot read the current value of `toolCallResult`; a connector tool must build its full result in one expression.

### What the rule cannot see

Results written from arbitrary FEEL expressions elsewhere (for example, a variable set by a called process) are not statically detectable. If your tool sets `toolCallResult` through such a channel, you can ignore the warning, or make the wiring explicit with an output mapping.

## <MarkerGuideline.Invalid /> Result never reaches the agent

The tool maps its output to `result` instead of `toolCallResult`, or no element in its flow sets a result at all.

## <MarkerGuideline.Valid /> `toolCallResult` set on some element of the tool flow

An output mapping targets `toolCallResult` (or a part like `toolCallResult.statusCode`), a connector result expression contains a `toolCallResult` key, or a script task's result variable is `toolCallResult`.

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

- [AI Agent tool definitions](../../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md)
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/agent-tool-output-key.js)
