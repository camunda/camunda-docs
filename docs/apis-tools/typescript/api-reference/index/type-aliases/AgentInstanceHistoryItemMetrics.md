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
durationMs: number;
```

Wall-clock duration of the LLM call in milliseconds.

---

### inputTokens

```ts
inputTokens: number;
```

Input tokens consumed by this LLM call.

---

### outputTokens

```ts
outputTokens: number;
```

Output tokens produced by this LLM call.
