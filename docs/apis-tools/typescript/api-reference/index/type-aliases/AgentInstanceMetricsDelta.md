---
title: "Type Alias: AgentInstanceMetricsDelta"
sidebar_label: "AgentInstanceMetricsDelta"
mdx:
  format: md
---

# Type Alias: AgentInstanceMetricsDelta

```ts
type AgentInstanceMetricsDelta = object;
```

Metric increments to apply to the agent instance aggregate counters. The engine
accumulates these deltas into running totals on each UPDATED event. All fields
are optional; omit a field to leave the corresponding counter unchanged.

## Properties

### inputTokens?

```ts
optional inputTokens?: number;
```

Increment to apply to the total input token counter.

---

### modelCalls?

```ts
optional modelCalls?: number;
```

Increment to apply to the total model call counter.

---

### outputTokens?

```ts
optional outputTokens?: number;
```

Increment to apply to the total output token counter.

---

### toolCalls?

```ts
optional toolCalls?: number;
```

Increment to apply to the total tool call counter.
