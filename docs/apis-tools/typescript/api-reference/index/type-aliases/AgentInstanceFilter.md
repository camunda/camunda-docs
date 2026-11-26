---
title: "Type Alias: AgentInstanceFilter"
sidebar_label: "AgentInstanceFilter"
mdx:
  format: md
---

# Type Alias: AgentInstanceFilter

```ts
type AgentInstanceFilter = object;
```

Agent instance search filter.

## Properties

### agentDefinitionKey?

```ts
agentDefinitionKey?: AgentDefinitionKeyFilterProperty;
```

The key of the agent definition this agent instance is an instance of.

---

### agentInstanceKey?

```ts
agentInstanceKey?: AgentInstanceKeyFilterProperty;
```

The unique key of the agent instance.

---

### completionDate?

```ts
completionDate?: DateTimeFilterProperty;
```

The completion date of the agent instance.

---

### creationDate?

```ts
creationDate?: DateTimeFilterProperty;
```

The creation date of the agent instance.

---

### elementId?

```ts
elementId?: ElementIdFilterProperty;
```

The BPMN element ID of the agent task.

---

### elementInstanceKeys?

```ts
elementInstanceKeys?: ElementInstanceKeyFilterProperty[];
```

The keys of element instances associated with this agent instance.
If multiple keys are provided, the filter matches agent instances associated with all of the provided keys at the same time.

---

### lastUpdatedDate?

```ts
lastUpdatedDate?: DateTimeFilterProperty;
```

The date the agent instance was last updated.

---

### processDefinitionId?

```ts
processDefinitionId?: StringFilterProperty;
```

The BPMN process ID of the process definition associated with this agent instance.

---

### processDefinitionKey?

```ts
processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The key of the process definition associated with this agent instance.

---

### processDefinitionVersion?

```ts
processDefinitionVersion?: IntegerFilterProperty;
```

The version of the process definition associated with this agent instance.

---

### processDefinitionVersionTag?

```ts
processDefinitionVersionTag?: StringFilterProperty;
```

The version tag of the process definition associated with this agent instance.

---

### processInstanceKey?

```ts
processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The key of the process instance that owns this agent instance.

---

### rootProcessInstanceKey?

```ts
rootProcessInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The key of the root process instance. Filters agent instances belonging to a specific
call hierarchy. The root process instance is the top-level ancestor in the process
instance hierarchy.

---

### status?

```ts
status?: AgentInstanceStatusFilterProperty;
```

The current status of the agent instance.

---

### tenantId?

```ts
tenantId?: StringFilterProperty;
```

The tenant ID of the agent instance.
