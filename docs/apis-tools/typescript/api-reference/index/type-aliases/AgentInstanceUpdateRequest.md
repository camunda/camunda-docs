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

Request to update the mutable state of an agent instance.

## Properties

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The key of the currently-active element instance for this agent instance.
Used for ownership/equality validation against the stored agent instance
and, when the supplied key differs from the previous association (re-entry
of an ad-hoc sub-process or AI Agent task), appended to elementInstanceKeys
with the reverse link updated on the supplied element instance.

---

### metrics?

```ts
optional metrics?: AgentInstanceMetricsDelta;
```

Metric increments to apply to the aggregate counters.

---

### status?

```ts
optional status?: AgentInstanceUpdateStatusEnum;
```

The new status of the agent instance.

---

### tools?

```ts
optional tools?: AgentTool[] | null;
```

The complete list of tools available to the agent, replacing any previously
stored tools. When provided, the engine replaces the existing tool list with
this value.
