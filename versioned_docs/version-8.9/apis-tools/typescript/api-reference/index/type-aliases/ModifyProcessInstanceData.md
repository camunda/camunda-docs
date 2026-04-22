---
title: "Type Alias: ModifyProcessInstanceData"
sidebar_label: "ModifyProcessInstanceData"
mdx:
  format: md
---

# Type Alias: ModifyProcessInstanceData

```ts
type ModifyProcessInstanceData = object;
```

## Properties

### body

```ts
body: ProcessInstanceModificationInstruction;
```

---

### path

```ts
path: object;
```

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKey;
```

The key of the process instance that should be modified.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/process-instances/{processInstanceKey}/modification";
```
