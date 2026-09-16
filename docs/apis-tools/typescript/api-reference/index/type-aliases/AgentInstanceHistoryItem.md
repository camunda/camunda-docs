---
title: "Type Alias: AgentInstanceHistoryItem"
sidebar_label: "AgentInstanceHistoryItem"
mdx:
  format: md
---

# Type Alias: AgentInstanceHistoryItem

```ts
type AgentInstanceHistoryItem = object;
```

A single history item to append to the agent instance's conversation history,
submitted as part of the batch on an agent instance update request.

## Properties

### content

```ts
content: AgentInstanceMessageContent[];
```

The content blocks of this history item.

---

### historyItemId

```ts
historyItemId: string;
```

Caller-assigned identifier used to detect and dedupe retries of the same
item. For example, when a retried job activation resubmits history items
it already sent in an earlier attempt, those items are not rejected; they
are flagged via isDuplicate in the response instead. Must be non-blank.

---

### limits?

```ts
optional limits?: AgentInstanceLimits;
```

The operational limits as of this entry. CONFIGURATION items only; omit for other
roles.

---

### loopIteration

```ts
loopIteration: LoopIterationId;
```

The loop iteration this item belongs to.

---

### metrics?

```ts
optional metrics?:
  | AgentInstanceHistoryItemMetrics
  | null;
```

Per-call token and latency metrics. Present on ASSISTANT items only.

---

### model?

```ts
optional model?: string;
```

The LLM model identifier as of this entry. CONFIGURATION items only; omit for other
roles.

---

### producedAt

```ts
producedAt: string;
```

The agent-side timestamp of when this message was produced.

---

### provider?

```ts
optional provider?: string;
```

The LLM provider as of this entry. CONFIGURATION items only; omit for other roles.

---

### role

```ts
role: AgentInstanceHistoryRoleEnum;
```

The role of this history item in the conversation.

---

### systemPrompt?

```ts
optional systemPrompt?:
  | AgentInstanceMessageContent[]
  | null;
```

The system prompt, as content blocks, as of this entry. CONFIGURATION items only;
omit for other roles. Omit to leave the system prompt unchanged; when present, must
be non-empty.

---

### toolCalls?

```ts
optional toolCalls?: AgentInstanceToolCall[] | null;
```

Tool calls associated with this history item.
For ASSISTANT items: tool calls dispatched by this LLM response.
For TOOL_RESULT items: single-entry array referencing the originating tool call.
Omit for USER items.

---

### tools?

```ts
optional tools?: AgentTool[] | null;
```

The complete list of tools available to the agent as of this entry. CONFIGURATION
items only; omit for other roles. Omit to leave the tool list unchanged; send an
empty array to clear it.
