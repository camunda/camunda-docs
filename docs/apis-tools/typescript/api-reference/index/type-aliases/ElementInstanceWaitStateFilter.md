---
title: "Type Alias: ElementInstanceWaitStateFilter"
sidebar_label: "ElementInstanceWaitStateFilter"
mdx:
  format: md
---

# Type Alias: ElementInstanceWaitStateFilter

```ts
type ElementInstanceWaitStateFilter = object;
```

Filters for the element instance inspection.

## Properties

### elementId?

```ts
elementId?: ElementIdFilterProperty;
```

Filter by element ID.

---

### elementInstanceKey?

```ts
elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

Filter by element instance key.

---

### elementType?

```ts
elementType?: WaitStateElementTypeFilterProperty;
```

Filter by element type.

---

### processInstanceKey?

```ts
processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

Filter by process instance key.

---

### rootProcessInstanceKey?

```ts
rootProcessInstanceKey?: ProcessInstanceKeyFilterProperty;
```

Filter by root process instance key.

---

### waitStateType?

```ts
waitStateType?: WaitStateTypeFilterProperty;
```

Filter by wait state type.
