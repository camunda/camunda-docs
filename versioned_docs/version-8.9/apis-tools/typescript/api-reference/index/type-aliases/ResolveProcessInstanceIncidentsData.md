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
optional body?: never;
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

The key of the process instance to resolve incidents for.

---

### query?

```ts
optional query?: never;
```

---

### url

```ts
url: "/process-instances/{processInstanceKey}/incident-resolution";
```
