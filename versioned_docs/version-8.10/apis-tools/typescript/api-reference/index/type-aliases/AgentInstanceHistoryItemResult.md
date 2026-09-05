---
title: "Type Alias: AgentInstanceHistoryItemResult"
sidebar_label: "AgentInstanceHistoryItemResult"
mdx:
  format: md
---

# Type Alias: AgentInstanceHistoryItemResult

```ts
type AgentInstanceHistoryItemResult = object;
```

A single conversation history item belonging to an agent instance.

## Properties

### agentInstanceKey

```ts
agentInstanceKey: AgentInstanceKey;
```

The key of the agent instance this item belongs to.

---

### commitStatus

```ts
commitStatus: AgentInstanceHistoryCommitStatusEnum;
```

The commit status of this history item.

---

### content

```ts
content: AgentInstanceMessageContent[];
```

The content blocks of this history item.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The key of the AI Agent Task or ad-hoc sub-process element instance under which this item was produced.

---

### historyItemId

```ts
historyItemId: string;
```

The client-supplied identifier this item was created with. Empty for items that don't
carry one.

---

### historyItemKey

```ts
historyItemKey: AgentHistoryItemKey;
```

The unique key for this history item. Stable and sortable by creation order.

---

### jobKey

```ts
jobKey: JobKey;
```

The key of the job activation during which this item was produced.

---

### jobLease

```ts
jobLease: string;
```

The lease token of the activation that produced this item.

---

### limits

```ts
limits: AgentInstanceLimits;
```

The operational limits as of this entry. CONFIGURATION items only; -1 on any field
means "no limit configured" for other roles.

---

### loopIteration

```ts
loopIteration: LoopIterationId;
```

The loop iteration this item belongs to.

---

### metrics

```ts
metrics:
  | AgentInstanceHistoryItemMetrics
  | null;
```

Per-call token and latency metrics. Null when metrics were not provided at creation time.

---

### model

```ts
model: string | null;
```

The LLM model identifier as of this entry. CONFIGURATION items only; null for other
roles.

---

### producedAt

```ts
producedAt: string;
```

The agent-side timestamp of when this message was produced.

---

### provider

```ts
provider: string | null;
```

The LLM provider as of this entry. CONFIGURATION items only; null for other roles.

---

### role

```ts
role: AgentInstanceHistoryRoleEnum;
```

The role of this history item in the conversation.

---

### systemPrompt

```ts
systemPrompt: AgentInstanceMessageContent[];
```

The system prompt, as content blocks, as of this entry. CONFIGURATION items only;
empty for other roles.

---

### toolCalls

```ts
toolCalls: AgentInstanceToolCall[];
```

Tool calls for this item. Empty for USER items and ASSISTANT items with no tool dispatches.
ASSISTANT items: dispatched tool calls.
TOOL_RESULT items: single-entry array referencing the originating tool call.

---

### tools

```ts
tools: AgentTool[];
```

The complete list of tools available to the agent as of this entry. CONFIGURATION
items only; empty for other roles.
