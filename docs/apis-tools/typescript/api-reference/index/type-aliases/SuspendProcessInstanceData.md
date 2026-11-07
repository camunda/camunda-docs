---
title: "Type Alias: SuspendProcessInstanceData"
sidebar_label: "SuspendProcessInstanceData"
mdx:
  format: md
---

# Type Alias: SuspendProcessInstanceData

```ts
type SuspendProcessInstanceData = object;
```

## Properties

### body?

```ts
body?: SuspendProcessInstanceRequest;
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

The key of the process instance to suspend.

---

### query?

```ts
query?: never;
```

---

### url

```ts
url: "/process-instances/{processInstanceKey}/suspension";
```
