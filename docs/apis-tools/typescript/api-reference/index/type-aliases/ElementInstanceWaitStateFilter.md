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
optional elementId?: ElementIdFilterProperty;
```

Filter by element ID.

---

### elementInstanceKey?

```ts
optional elementInstanceKey?: ElementInstanceKeyFilterProperty;
```

Filter by element instance key.

---

### elementType?

```ts
optional elementType?: WaitStateElementTypeFilterProperty;
```

Filter by element type.

---

### processInstanceKey?

```ts
optional processInstanceKey?: ProcessInstanceKeyFilterProperty;
```

Filter by process instance key.

---

### rootProcessInstanceKey?

```ts
optional rootProcessInstanceKey?: ProcessInstanceKeyFilterProperty;
```

Filter by root process instance key.

---

### waitStateType?

```ts
optional waitStateType?: WaitStateTypeFilterProperty;
```

Filter by wait state type.
