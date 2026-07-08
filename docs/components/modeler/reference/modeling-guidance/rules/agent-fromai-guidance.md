---
id: agent-fromai-guidance
title: Agent fromAi() guidance
description: Reference for the `agent-fromai-guidance` rule.
---

import MarkerGuideline from "@site/src/mdx/MarkerGuideline";

The [`fromAi()`](../../../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md) FEEL function declares a tool's LLM-supplied inputs inside an [AI agent sub-process](../../../../agentic-orchestration/agentic-orchestration-overview.md). This rule flags a call that has a plausible reading but might not resolve the way you expect.

Breaks with no legitimate reading (wrong key type, a description that is not a string literal, wrong context, and others) are unambiguous mistakes and live in [Agent fromAi() contract](./agent-fromai-contract.md) as errors. A tool's own missing documentation is covered by [Agent tool documentation](./agent-tool-documentation.md).

## <MarkerGuideline.Invalid /> Valid but not recommended

- **Key is a conditional expression** (`if ... then ... else ...`): a conditional key might be correct depending on which branch fires at runtime. Ensure at least one branch resolves to a `toolCall.*` path.

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

- [Agent fromAi() contract](./agent-fromai-contract.md), covering the error-level checks on the same `fromAi()` call
- [AI Agent tool definitions](../../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md)
- [`fromAi()` FEEL function](../../../../modeler/feel/builtin-functions/feel-built-in-functions-miscellaneous.md)
- [Rule source](https://github.com/camunda/bpmnlint-plugin-camunda-compat/blob/main/rules/camunda-cloud/agent-fromai-guidance.js)
