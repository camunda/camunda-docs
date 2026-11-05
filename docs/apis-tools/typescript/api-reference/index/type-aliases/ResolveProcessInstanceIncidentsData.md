---
title: "Type Alias: ResolveProcessInstanceIncidentsData"
sidebar_label: "ResolveProcessInstanceIncidentsData"
mdx:
  format: md
---

# Type Alias: ResolveProcessInstanceIncidentsData

```ts
type ResolveProcessInstanceIncidentsData = object;
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

The key of the process instance to resolve incidents for.

---

### query?

```ts
query?: never;
```

---

### url

```ts
url: "/process-instances/{processInstanceKey}/incident-resolution";
```
