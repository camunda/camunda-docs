---
title: "Type Alias: ProcessInstanceSequenceFlowResult"
sidebar_label: "ProcessInstanceSequenceFlowResult"
mdx:
  format: md
---

# Type Alias: ProcessInstanceSequenceFlowResult

```ts
type ProcessInstanceSequenceFlowResult = object;
```

Process instance sequence flow result.

## Properties

### elementId

```ts
elementId: ElementId;
```

The element id for this sequence flow, as provided in the BPMN process.

---

### processDefinitionId

```ts
processDefinitionId: ProcessDefinitionId;
```

The process definition id.

---

### processDefinitionKey

```ts
processDefinitionKey: ProcessDefinitionKey;
```

The process definition key.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of this process instance.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

The key of the root process instance. The root process instance is the top-level
ancestor in the process instance hierarchy. This field is only present for data
belonging to process instance hierarchies created in version 8.9 or later.

---

### sequenceFlowId

```ts
sequenceFlowId: string;
```

The sequence flow id.

---

### tenantId

```ts
tenantId: TenantId;
```
