---
title: "Type Alias: SearchAgentInstanceHistoryData"
sidebar_label: "SearchAgentInstanceHistoryData"
mdx:
  format: md
---

# Type Alias: SearchAgentInstanceHistoryData

```ts
type SearchAgentInstanceHistoryData = object;
```

## Properties

### body?

```ts
optional body?: AgentInstanceHistorySearchQuery;
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

The key of the agent instance whose history to search.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/agent-instances/{agentInstanceKey}/history/search";
```
