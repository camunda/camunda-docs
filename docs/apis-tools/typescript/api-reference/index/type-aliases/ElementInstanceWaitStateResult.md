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

### jobDetails

```ts
jobDetails: JobWaitStateDetails | null;
```

Job details, present when waitStateType is JOB.

---

### messageDetails

```ts
messageDetails: MessageWaitStateDetails | null;
```

Message details, present when waitStateType is MESSAGE.

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

---

### waitStateType

```ts
waitStateType: WaitStateTypeEnum;
```

The type of waiting state an element instance is in.
