---
title: "Type Alias: VariableHistoryItemResultBase"
sidebar_label: "VariableHistoryItemResultBase"
mdx:
  format: md
---

# Type Alias: VariableHistoryItemResultBase

```ts
type VariableHistoryItemResultBase = object;
```

Variable history item response base.

## Properties

### actorId

```ts
actorId: string | null;
```

The id of the user or client that caused this change, if known.

---

### actorType

```ts
actorType: VariableHistoryItemActorTypeEnum;
```

---

### agentElementId

```ts
agentElementId: ElementId | null;
```

The element id of the agent that caused this change, for example the element id
of an ad-hoc sub-process, if any.

---

### elementId

```ts
elementId: ElementId | null;
```

The model-defined id of the element that caused this change, if any.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey | null;
```

The key of the element instance that caused this change, if any.

---

### name

```ts
name: string;
```

Name of the variable.

---

### operationType

```ts
operationType: VariableHistoryItemOperationTypeEnum;
```

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The id of the process definition.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The key of the process definition.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance of this variable.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### scopeKey

```ts
scopeKey: ScopeKey;
```

The key of the scope where this variable is directly defined. For process-level
variables, this is the process instance key. For local variables, this is the key
of the specific element instance where the variable is directly defined.

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant id of this variable.

---

### timestamp

```ts
timestamp: string;
```

The timestamp when this change occurred.

---

### variableHistoryItemKey

```ts
variableHistoryItemKey: VariableHistoryItemKey;
```

The unique key of this variable history item.

---

### variableKey

```ts
variableKey: VariableKey;
```

The key of the variable this history item belongs to.

---

### variableOperationType

```ts
variableOperationType: VariableHistoryItemVariableOperationTypeEnum;
```
