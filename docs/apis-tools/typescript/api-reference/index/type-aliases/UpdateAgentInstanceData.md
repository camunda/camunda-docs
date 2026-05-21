---
title: "Type Alias: UpdateAgentInstanceData"
sidebar_label: "UpdateAgentInstanceData"
mdx:
  format: md
---

# Type Alias: UpdateAgentInstanceData

```ts
type UpdateAgentInstanceData = object;
```

## Properties

### body

```ts
body: AgentInstanceUpdateRequest;
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

The key of the agent instance to update.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/agent-instances/{agentInstanceKey}";
```
