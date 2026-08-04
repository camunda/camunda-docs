---
title: "Type Alias: AgentInstanceToolCall"
sidebar_label: "AgentInstanceToolCall"
mdx:
  format: md
---

# Type Alias: AgentInstanceToolCall

```ts
type AgentInstanceToolCall = object;
```

A tool call associated with a history item. Used in both ASSISTANT and TOOL_RESULT items.
ASSISTANT items carry arguments; TOOL_RESULT items carry arguments as null.

## Properties

### arguments

```ts
arguments:
  | {
[key: string]: unknown;
}
  | null;
```

The tool call arguments as provided by the LLM. Null on TOOL_RESULT items.

---

### elementId

```ts
elementId: string | null;
```

The BPMN element ID handling this tool.

---

### toolCallId

```ts
toolCallId: string;
```

The LLM-assigned tool call ID. Correlates ASSISTANT items to their matching TOOL_RESULT items.

---

### toolName

```ts
toolName: string;
```

The LLM-visible tool name.
