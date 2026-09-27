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

### history?

```ts
optional history?: AgentInstanceHistoryItem[] | null;
```

A batch of history items to append to the agent instance's conversation
history, in request order. Each created item is echoed back in the
response's createdHistory, positionally correlated.

---

### jobKey?

```ts
optional jobKey?: JobKey | null;
```

The key of the job activation during which this update is being made.
Required whenever history is provided.

---

### jobLease?

```ts
optional jobLease?: string | null;
```

Opaque lease token received from the job activation response. Disambiguates
this activation from any other activation of the same job: if the job is
later retried, history items submitted under a superseded lease are discarded
rather than committed.

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
