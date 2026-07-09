---
title: "Type Alias: AgentInstanceHistoryItemRequest"
sidebar_label: "AgentInstanceHistoryItemRequest"
mdx:
  format: md
---

# Type Alias: AgentInstanceHistoryItemRequest

```ts
type AgentInstanceHistoryItemRequest = object;
```

Request to append a single history item to an agent instance's conversation history.

## Properties

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

The key of the currently-active element instance.

---

### iteration?

```ts
optional iteration?: IterationId | null;
```

Sequential iteration number this item belongs to. Omit if not grouping items into iterations.

---

### jobKey

```ts
jobKey: JobKey;
```

The key of the current job activation during which this history item was produced.

---

### jobLease

```ts
jobLease: string;
```

Opaque lease token received from the job activation response.

---

### metrics?

```ts
optional metrics?:
  | AgentInstanceHistoryItemMetrics
  | null;
```

Per-call token and latency metrics. Present on ASSISTANT items only.

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

### toolCalls?

```ts
optional toolCalls?: AgentInstanceToolCall[] | null;
```

Tool calls associated with this history item.
For ASSISTANT items: tool calls dispatched by this LLM response, with arguments populated.
For TOOL_RESULT items: single-entry array referencing the originating tool call, with arguments null.
Omit for USER items.
