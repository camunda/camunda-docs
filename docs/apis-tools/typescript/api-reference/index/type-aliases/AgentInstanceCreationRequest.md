---
title: "Type Alias: AgentInstanceCreationRequest"
sidebar_label: "AgentInstanceCreationRequest"
mdx:
  format: md
---

# Type Alias: AgentInstanceCreationRequest

```ts
type AgentInstanceCreationRequest = object;
```

Request to create a new agent instance.

## Properties

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The key of the AI Agent Sub-process or AI Agent Task element instance.
The engine uses this key to infer processInstanceKey, elementId,
processDefinitionKey, and tenantId.

---

### history

```ts
history: AgentInstanceHistoryItem[];
```

A batch of history items to append to the agent instance's conversation
history, in request order. Each created item is echoed back in the
response's createdHistory, positionally correlated. Must include a
CONFIGURATION item establishing model, provider, and systemPrompt (and,
if needed, limits).

---

### jobKey

```ts
jobKey: JobKey;
```

The key of the job activation during which this creation is being made.
A creation must always be attributed to the active job that produced it.

---

### jobLease

```ts
jobLease: string;
```

Opaque lease token received from the job activation response. Disambiguates
this activation from any other activation of the same job: if the job is
later retried, history items submitted under a superseded lease are discarded
rather than committed.
