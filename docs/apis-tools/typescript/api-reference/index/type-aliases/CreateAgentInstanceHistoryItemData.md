---
title: "Type Alias: CreateAgentInstanceHistoryItemData"
sidebar_label: "CreateAgentInstanceHistoryItemData"
mdx:
  format: md
---

# Type Alias: CreateAgentInstanceHistoryItemData

```ts
type CreateAgentInstanceHistoryItemData = object;
```

## Properties

### body

```ts
body: AgentInstanceHistoryItemRequest;
```

---

### path

```ts
path: object;
```

#### agentInstanceKey

```ts
agentInstanceKey: AgentInstanceKey;
```

The key of the agent instance to append the history item to.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/agent-instances/{agentInstanceKey}/history";
```
