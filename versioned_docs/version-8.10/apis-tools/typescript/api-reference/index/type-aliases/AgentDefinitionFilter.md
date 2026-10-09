---
title: "Type Alias: AgentDefinitionFilter"
sidebar_label: "AgentDefinitionFilter"
mdx:
  format: md
---

# Type Alias: AgentDefinitionFilter

```ts
type AgentDefinitionFilter = object;
```

Agent definition search filter.

## Properties

### agentDefinitionKey?

```ts
optional agentDefinitionKey?: AgentDefinitionKeyFilterProperty;
```

The unique key of the agent definition.

---

### agentType?

```ts
optional agentType?: AgentDefinitionTypeFilterProperty;
```

The kind of agent this agent definition describes.

---

### elementId?

```ts
optional elementId?: ElementIdFilterProperty;
```

The BPMN element ID of the process element that owns the agent definition.

---

### name?

```ts
optional name?: StringFilterProperty;
```

The human-readable name of the process element that owns the agent definition.

---

### processDefinitionId?

```ts
optional processDefinitionId?: ProcessDefinitionIdFilterProperty;
```

The BPMN process ID of the process definition that owns the agent definition.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The key of the process definition that owns the agent definition.

---

### processDefinitionVersion?

```ts
optional processDefinitionVersion?: IntegerFilterProperty;
```

The version of the process definition that owns the agent definition.

---

### processDefinitionVersionTag?

```ts
optional processDefinitionVersionTag?: StringFilterProperty;
```

The version tag of the process definition that owns the agent definition.

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

The tenant ID of the agent definition.
