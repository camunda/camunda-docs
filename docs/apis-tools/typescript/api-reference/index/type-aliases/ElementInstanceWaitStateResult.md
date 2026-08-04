---
title: "Type Alias: ElementInstanceWaitStateResult"
sidebar_label: "ElementInstanceWaitStateResult"
mdx:
  format: md
---

# Type Alias: ElementInstanceWaitStateResult

```ts
type ElementInstanceWaitStateResult = object;
```

An element instance waiting state.

## Properties

### bpmnProcessId

```ts
bpmnProcessId: string;
```

The BPMN process ID of the process definition associated to this element instance.

---

### details

```ts
details: WaitStateDetails;
```

Wait-state-specific details, resolved by waitStateType.

---

### elementId

```ts
elementId: ElementId;
```

The element ID for this element instance.

---

### elementInstanceKey

```ts
elementInstanceKey: ElementInstanceKey;
```

The element instance key associated to this element instance.

---

### elementType

```ts
elementType: WaitStateElementTypeEnum;
```

The BPMN element type of this element instance.

---

### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The process instance key associated to this element instance.

---

### rootProcessInstanceKey

```ts
rootProcessInstanceKey: ProcessInstanceKey | null;
```

Key of the root process instance.

---

### tenantId

```ts
tenantId: TenantId;
```

The tenant ID of the element instance.
