---
title: "Type Alias: AgentInstanceMetrics"
sidebar_label: "AgentInstanceMetrics"
mdx:
  format: md
---

# Type Alias: AgentInstanceMetrics

```ts
type AgentInstanceMetrics = object;
```

Aggregated metrics for an agent instance across all model calls.

## Properties

### inputTokens

```ts
inputTokens: number;
```

Total input tokens consumed across all model calls.

---

### modelCalls

```ts
modelCalls: number;
```

Total number of LLM calls made.

---

### outputTokens

```ts
outputTokens: number;
```

Total output tokens produced across all model calls.

---

### toolCalls

```ts
toolCalls: number;
```

Total number of tool calls made.
