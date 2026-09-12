---
title: "Type Alias: AgentInstanceHistoryItemMetricsRequest"
sidebar_label: "AgentInstanceHistoryItemMetricsRequest"
mdx:
  format: md
---

# Type Alias: AgentInstanceHistoryItemMetricsRequest

```ts
type AgentInstanceHistoryItemMetricsRequest = object;
```

Per-call token and latency metrics for an ASSISTANT history item, as submitted on a
create/update request. All fields are optional: omit a field the caller has no value
for rather than sending it as an explicit null.

## Properties

### cacheCreationTokenCount?

```ts
optional cacheCreationTokenCount?: number | null;
```

Cache-creation tokens consumed by this LLM call. Null when not provided.

---

### cacheReadTokenCount?

```ts
optional cacheReadTokenCount?: number | null;
```

Cache-read tokens consumed by this LLM call. Null when not provided.

---

### durationMs?

```ts
optional durationMs?: number | null;
```

Wall-clock duration of the LLM call in milliseconds. Null when not provided.

---

### inputTokens?

```ts
optional inputTokens?: number | null;
```

Input tokens consumed by this LLM call. Null when not provided.

---

### outputTokens?

```ts
optional outputTokens?: number | null;
```

Output tokens produced by this LLM call. Null when not provided.

---

### reasoningTokenCount?

```ts
optional reasoningTokenCount?: number | null;
```

Reasoning tokens consumed by this LLM call. Null when not provided.
