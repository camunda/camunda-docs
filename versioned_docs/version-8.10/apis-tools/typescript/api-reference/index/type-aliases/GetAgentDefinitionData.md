---
title: "Type Alias: GetAgentDefinitionData"
sidebar_label: "GetAgentDefinitionData"
mdx:
  format: md
---

# Type Alias: GetAgentDefinitionData

```ts
type GetAgentDefinitionData = object;
```

## Properties

### body?

```ts
optional body?: never;
```

---

### path

```ts
path: object;
```

#### agentDefinitionKey

```ts
agentDefinitionKey: AgentDefinitionKeyWritable;
```

The assigned key of the agent definition, which acts as a unique identifier for this agent definition.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/agent-definitions/{agentDefinitionKey}";
```
