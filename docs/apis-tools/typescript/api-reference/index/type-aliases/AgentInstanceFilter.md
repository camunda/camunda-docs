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

### agentInstanceKey?

```ts
optional agentInstanceKey?: AgentInstanceKeyFilterProperty;
```

The unique key of the agent instance.

---

### completionDate?

```ts
optional completionDate?: DateTimeFilterProperty;
```

The completion date of the agent instance.

---

### creationDate?

```ts
optional creationDate?: DateTimeFilterProperty;
```

The creation date of the agent instance.

---

### elementId?

```ts
optional elementId?: ElementIdFilterProperty;
```

The BPMN element ID of the agent task.

---

### elementInstanceKeys?

```ts
optional elementInstanceKeys?: ElementInstanceKeyFilterProperty[];
```

The keys of element instances associated with this agent instance.
If multiple keys are provided, the filter matches agent instances associated with all of the provided keys at the same time.

---

### lastUpdatedDate?

```ts
optional lastUpdatedDate?: DateTimeFilterProperty;
```

The date the agent instance was last updated.

---

### processDefinitionId?

```ts
optional processDefinitionId?: StringFilterProperty;
```

The BPMN process ID of the process definition associated with this agent instance.

---

### processDefinitionKey?

```ts
optional processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The key of the process definition associated with this agent instance.

---

### processDefinitionVersion?

```ts
optional processDefinitionVersion?: IntegerFilterProperty;
```

The version of the process definition associated with this agent instance.

---

### processDefinitionVersionTag?

```ts
optional processDefinitionVersionTag?: StringFilterProperty;
```

The version tag of the process definition associated with this agent instance.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The key of the process instance that owns this agent instance.

---

### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The key of the root process instance. Filters agent instances belonging to a specific
call hierarchy. The root process instance is the top-level ancestor in the process
instance hierarchy.

---

### status?

```ts
optional status?: AgentInstanceStatusFilterProperty;
```

The current status of the agent instance.

---

### tenantId?

```ts
optional tenantId?: StringFilterProperty;
```

The tenant ID of the agent instance.
