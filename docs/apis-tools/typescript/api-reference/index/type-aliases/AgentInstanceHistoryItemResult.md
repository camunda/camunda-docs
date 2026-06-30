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

### historyItemKey

```ts
historyItemKey: AgentHistoryItemKey;
```

The unique key for this history item. Stable and sortable by creation order.

---

### iteration

```ts
iteration: IterationId | null;
```

The sequential iteration number this item belongs to. Null if not provided by the connector.

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

### metrics

```ts
metrics: AgentInstanceHistoryItemMetrics;
```

Per-call token and latency metrics. Zero-valued when not available.

---

### producedAt

```ts
producedAt: string;
```

The connector-side timestamp of when this message was produced.

---

### role

```ts
role: AgentInstanceHistoryRoleEnum;
```

The role of this history item in the conversation.

---

### toolCalls

```ts
toolCalls: AgentInstanceToolCall[];
```

Tool calls for this item. Empty for USER items and ASSISTANT items with no tool dispatches.
ASSISTANT items: dispatched tool calls with arguments populated.
TOOL_RESULT items: single-entry array referencing the originating tool call (arguments null).
