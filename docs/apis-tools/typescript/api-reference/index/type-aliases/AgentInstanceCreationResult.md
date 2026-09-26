---
title: "Type Alias: AgentInstanceCreationResult"
sidebar_label: "AgentInstanceCreationResult"
mdx:
  format: md
---

# Type Alias: AgentInstanceCreationResult

```ts
type AgentInstanceCreationResult = object;
```

Response returned after successfully creating an agent instance.

## Properties

### agentInstanceKey

```ts
agentInstanceKey: AgentInstanceKey;
```

The system-generated key for the created agent instance.

---

### createdHistory

```ts
createdHistory: AgentInstanceCreatedHistoryItem[];
```

One entry per history item submitted in the request, in request order.
