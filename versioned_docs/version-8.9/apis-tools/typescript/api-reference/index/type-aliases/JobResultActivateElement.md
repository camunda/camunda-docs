---
title: "Type Alias: JobResultActivateElement"
sidebar_label: "JobResultActivateElement"
mdx:
  format: md
---

# Type Alias: JobResultActivateElement

```ts
type JobResultActivateElement = object;
```

Instruction to activate a single BPMN element within an ad‑hoc sub‑process, optionally providing variables scoped to that element.

## Properties

### elementId?

```ts
optional elementId?: ElementId;
```

The element ID to activate.

---

### variables?

```ts
optional variables?:
  | {
[key: string]: unknown;
}
  | null;
```

Variables for the element.
