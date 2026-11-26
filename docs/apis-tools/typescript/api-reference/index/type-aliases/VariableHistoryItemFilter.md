---
title: "Type Alias: VariableHistoryItemFilter"
sidebar_label: "VariableHistoryItemFilter"
mdx:
  format: md
---

# Type Alias: VariableHistoryItemFilter

```ts
type VariableHistoryItemFilter = object;
```

Variable history item filter request.

## Properties

### actorId?

```ts
actorId?: StringFilterProperty;
```

The id of the user or client that caused this change, if known.

---

### actorType?

```ts
actorType?: VariableHistoryItemActorTypeFilterProperty;
```

The type of the actor who performed the operation.

---

### agentElementId?

```ts
agentElementId?: ElementIdFilterProperty;
```

The element id of the agent that caused this change, for example the element id
of an ad-hoc sub-process, if any.

---

### elementId?

```ts
elementId?: ElementIdFilterProperty;
```

The model-defined id of the element that caused this change, if any.

---

### elementInstanceKey?

```ts
elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

The key of the element instance that caused this change, if any.

---

### name?

```ts
name?: StringFilterProperty;
```

Name of the variable.

---

### operationType?

```ts
operationType?: VariableHistoryItemOperationTypeFilterProperty;
```

The type of operation that produced this variable change.

---

### processDefinitionId?

```ts
processDefinitionId?: ProcessDefinitionIdFilterProperty;
```

The id of the process definition.

---

### processDefinitionKey?

```ts
processDefinitionKey?: ProcessDefinitionKeyFilterProperty;
```

The key of the process definition.

---

### processInstanceKey?

```ts
processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

The key of the process instance of this variable.

---

### scopeKey?

```ts
scopeKey?: ScopeKeyFilterProperty;
```

The key of the scope that defines where this variable is directly defined. This can
be a process instance key (for process-level variables) or an element instance key
(for local variables scoped to tasks, sub-processes, gateways, events, etc.).

---

### tenantId?

```ts
tenantId?: StringFilterProperty;
```

The tenant id of this variable.

---

### timestamp?

```ts
timestamp?: DateTimeFilterProperty;
```

The timestamp when this change occurred.

---

### variableHistoryItemKey?

```ts
variableHistoryItemKey?: VariableHistoryItemKeyFilterProperty;
```

The unique key of this variable history item.

---

### variableKey?

```ts
variableKey?: VariableKeyFilterProperty;
```

The key of the variable this history item belongs to.

---

### variableOperationType?

```ts
variableOperationType?: VariableHistoryItemVariableOperationTypeFilterProperty;
```

What wrote this variable value.
