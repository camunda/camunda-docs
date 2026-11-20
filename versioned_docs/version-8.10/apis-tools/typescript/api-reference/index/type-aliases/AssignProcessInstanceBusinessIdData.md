---
title: "Type Alias: AssignProcessInstanceBusinessIdData"
sidebar_label: "AssignProcessInstanceBusinessIdData"
mdx:
  format: md
---

# Type Alias: AssignProcessInstanceBusinessIdData

```ts
type AssignProcessInstanceBusinessIdData = object;
```

## Properties

### body

```ts
body: ProcessInstanceBusinessIdAssignmentInstruction;
```

---

### path

```ts
path: object;
```

#### processInstanceKey

```ts
processInstanceKey: ProcessInstanceKeyWritable;
```

The key of the process instance to assign the business id to.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/process-instances/{processInstanceKey}/business-id-assignment";
```
