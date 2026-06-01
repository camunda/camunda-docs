---
title: "Type Alias: AgentInstanceUpdateRequest"
sidebar_label: "AgentInstanceUpdateRequest"
mdx:
  format: md
---

# Type Alias: AgentInstanceUpdateRequest

```ts
type AgentInstanceUpdateRequest = object;
```

Request to update the mutable state of an agent instance. At least one of
status, metrics, or tools must be provided.

## Properties

### metrics?

```ts
optional metrics?: AgentInstanceMetricsDelta;
```

Metric increments to apply to the aggregate counters.

---

### status?

```ts
optional status?: AgentInstanceStatusEnum;
```

The new status of the agent instance.

---

### tools?

```ts
optional tools?: AgentTool[];
```

The complete list of tools available to the agent, replacing any previously
stored tools. When provided, the engine replaces the existing tool list with
this value.
