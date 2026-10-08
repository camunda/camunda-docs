---
title: "Type Alias: ResumeProcessInstanceData"
sidebar_label: "ResumeProcessInstanceData"
mdx:
  format: md
---

# Type Alias: ResumeProcessInstanceData

```ts
type ResumeProcessInstanceData = object;
```

## Properties

### body?

```ts
optional body?: ResumeProcessInstanceRequest;
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

The key of the process instance to resume.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/process-instances/{processInstanceKey}/resumption";
```
