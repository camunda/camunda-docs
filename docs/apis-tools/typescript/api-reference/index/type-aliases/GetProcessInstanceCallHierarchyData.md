---
title: "Type Alias: GetProcessInstanceCallHierarchyData"
sidebar_label: "GetProcessInstanceCallHierarchyData"
mdx:
  format: md
---

# Type Alias: GetProcessInstanceCallHierarchyData

```ts
type GetProcessInstanceCallHierarchyData = object;
```

## Properties

### body?

```ts
body?: never;
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

The key of the process instance to fetch the hierarchy for.

---

### query?

```ts
query?: never;
```

---

### url

```ts
url: "/process-instances/{processInstanceKey}/call-hierarchy";
```
