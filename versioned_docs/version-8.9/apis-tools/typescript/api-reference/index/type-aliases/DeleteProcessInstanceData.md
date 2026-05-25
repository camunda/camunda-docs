---
title: "Type Alias: DeleteProcessInstanceData"
sidebar_label: "DeleteProcessInstanceData"
mdx:
  format: md
---

# Type Alias: DeleteProcessInstanceData

```ts
type DeleteProcessInstanceData = object;
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

The key of the process instance to delete.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/process-instances/{processInstanceKey}/deletion";
```
