---
title: "Type Alias: CancelProcessInstanceData"
sidebar_label: "CancelProcessInstanceData"
mdx:
  format: md
---

# Type Alias: CancelProcessInstanceData

```ts
type CancelProcessInstanceData = object;
```

## Properties

### body?

```ts
optional body?:
  | {
  operationReference?: OperationReference;
}
  | null;
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

The key of the process instance to cancel.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/process-instances/{processInstanceKey}/cancellation";
```
