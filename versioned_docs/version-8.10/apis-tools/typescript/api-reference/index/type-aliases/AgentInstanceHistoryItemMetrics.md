---
title: "Type Alias: AgentInstanceHistoryItemMetrics"
sidebar_label: "AgentInstanceHistoryItemMetrics"
mdx:
  format: md
---

# Type Alias: AgentInstanceHistoryItemMetrics

```ts
type AgentInstanceHistoryItemMetrics = object;
```

Per-call token and latency metrics for an ASSISTANT history item.

## Properties

### durationMs

```ts
durationMs: number | null;
```

Wall-clock duration of the LLM call in milliseconds. Null when not provided.

---

### inputTokens

```ts
inputTokens: number | null;
```

Input tokens consumed by this LLM call. Null when not provided.

---

### outputTokens

```ts
outputTokens: number | null;
```

Output tokens produced by this LLM call. Null when not provided.
