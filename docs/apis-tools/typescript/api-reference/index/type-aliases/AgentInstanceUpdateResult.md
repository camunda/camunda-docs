---
title: "Type Alias: AgentInstanceUpdateResult"
sidebar_label: "AgentInstanceUpdateResult"
mdx:
  format: md
---

# Type Alias: AgentInstanceUpdateResult

```ts
type AgentInstanceUpdateResult = object;
```

Response returned after successfully updating an agent instance.

## Properties

### createdHistory

```ts
createdHistory: AgentInstanceCreatedHistoryItem[];
```

One entry per history item submitted in the request, in request order.
Empty when no history items were submitted.
