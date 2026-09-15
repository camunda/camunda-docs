---
title: "Type Alias: AgentDefinitionResult"
sidebar_label: "AgentDefinitionResult"
mdx:
  format: md
---

# Type Alias: AgentDefinitionResult

```ts
type AgentDefinitionResult = object;
```

An agent definition, created at deploy time for the process element it belongs to.

## Properties

### agentDefinitionKey

```ts
agentDefinitionKey: AgentDefinitionKey;
```

The unique key for this agent definition. Unique across process definition versions.

---

### agentType

```ts
agentType: AgentDefinitionTypeEnum;
```

---

### elementId

```ts
elementId: ElementId;
```

The BPMN element ID of the process element that owns the agent definition.

---

### name

```ts
name: string;
```

The human-readable name of the process element that owns the agent definition. Falls
back to elementId when the element has no BPMN name configured.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The BPMN process ID of the process definition that owns the agent definition.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The key of the process definition that owns the agent definition.

---

### processDefinitionVersion

```ts
processDefinitionVersion: number;
```

The version of the process definition that owns the agent definition.

---

### processDefinitionVersionTag

```ts
processDefinitionVersionTag: string | null;
```

The version tag of the process definition that owns the agent definition.

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID of this agent definition.
