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

### definition

```ts
definition: AgentInstanceDefinition;
```

Static definition set once at creation.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The key of the AI Agent Sub-process or AI Agent Task element instance.
The engine uses this key to infer processInstanceKey, elementId,
processDefinitionKey, and tenantId.

---

### limits?

```ts
optional limits?: AgentInstanceLimits;
```

Limits for the agent execution. When omitted, all limits default to -1
(no limit).
